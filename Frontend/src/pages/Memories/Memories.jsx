import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./Memories.css";

const Memories = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("large");
  const [sortBy, setSortBy] = useState("serial");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Optimize Cloudinary URLs
  const optimizeImageUrl = (url, width = 400, quality = "good") => {
    if (!url) return "";
    if (url.includes("res.cloudinary.com")) {
      return url.replace(
        "/upload/",
        `/upload/q_auto:${quality},f_auto,w_${width}/`,
      );
    }
    return url;
  };

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/image/list`,
        );

        const processedMemories = response.data.message
          .map((item) => ({
            ...item,
            img_sm: optimizeImageUrl(item.img, 300),
            img_md: optimizeImageUrl(item.img, 600),
            img_lg: optimizeImageUrl(item.img, 1200),
            img_xl: optimizeImageUrl(item.img, 1600),
          }))
          .sort((a, b) => a.serial - b.serial);

        setMemories(processedMemories);
      } catch (err) {
        setError("Failed to load memories. Please try again.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const sortedMemories = useMemo(() => {
    const sorted = [...memories];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      if (memories[0]?.createdAt) {
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        sorted.sort((a, b) => a.serial - b.serial);
      }
    } else {
      sorted.sort((a, b) => a.serial - b.serial);
    }
    return sorted;
  }, [memories, sortBy]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") navigateModal("prev");
        if (e.key === "ArrowRight") navigateModal("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, modalImageIndex, sortedMemories.length]);

  const openModal = (index) => {
    setModalImageIndex(index);
    setModalOpen(true);
    setImageLoaded(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigateModal = (direction) => {
    setModalImageIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? sortedMemories.length - 1 : prev - 1;
      }
      return (prev + 1) % sortedMemories.length;
    });
    setImageLoaded(false);
  };

  // Helper to get image URL based on view mode
  const getImageUrlForView = (memory, mode) => {
    switch (mode) {
      case "extraLarge":
        return memory.img_xl || memory.img_lg;
      case "large":
        return memory.img_lg || memory.img_md;
      case "medium":
        return memory.img_md || memory.img_sm;
      case "list":
        return memory.img_sm;
      default:
        return memory.img_sm;
    }
  };

  // Render grid item
  const renderGridItem = (memory, index) => {
    const imgUrl = getImageUrlForView(memory, viewMode);
    return (
      <div
        key={memory._id}
        className={`gallery-item ${viewMode}`}
        onClick={() => openModal(index)}
        role="button"
        tabIndex={0}
        aria-label={`View ${memory.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openModal(index);
        }}
      >
        <div className="item-image-wrapper">
          <img
            src={imgUrl}
            alt={memory.title}
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x300?text=${encodeURIComponent(memory.title)}`;
            }}
          />
        </div>
        <div className="item-caption">
          <h3>{memory.title}</h3>
        </div>
      </div>
    );
  };

  // Render list item
  const renderListItem = (memory, index) => {
    return (
      <div
        key={memory._id}
        className="list-item"
        onClick={() => openModal(index)}
        role="button"
        tabIndex={0}
        aria-label={`View ${memory.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openModal(index);
        }}
      >
        <div className="list-item-image">
          <img
            src={memory.img_sm}
            alt={memory.title}
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://placehold.co/100x100?text=${encodeURIComponent(memory.title)}`;
            }}
          />
        </div>
        <div className="list-item-details">
          <h3>{memory.title}</h3>
          {memory.createdAt && (
            <p className="item-date">
              {new Date(memory.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading precious moments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>⚠️ Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Memories Found</h3>
        <p>Check back later for new moments.</p>
      </div>
    );
  }

  return (
    <div className="memories-gallery">
      <header className="gallery-header">
        <h1>Our Precious Moments</h1>
        <div className="gallery-toolbar">
          {/* View Mode Selector */}
          <div className="view-mode-selector" aria-label="View mode">
            <button
              className={`mode-btn ${viewMode === "extraLarge" ? "active" : ""}`}
              onClick={() => setViewMode("extraLarge")}
              aria-label="Extra Large view"
              title="Extra Large"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M3 4h18v16H3V4zm2 2v12h14V6H5z" />
              </svg>
            </button>
            <button
              className={`mode-btn ${viewMode === "large" ? "active" : ""}`}
              onClick={() => setViewMode("large")}
              aria-label="Large view"
              title="Large"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M3 4h8v8H3V4zm10 0h8v8h-8V4zM3 14h8v8H3v-8zm10 0h8v8h-8v-8z" />
              </svg>
            </button>
            <button
              className={`mode-btn ${viewMode === "medium" ? "active" : ""}`}
              onClick={() => setViewMode("medium")}
              aria-label="Medium view"
              title="Medium"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M3 4h5v5H3V4zm7 0h5v5h-5V4zm7 0h5v5h-5V4zM3 11h5v5H3v-5zm7 0h5v5h-5v-5zm7 0h5v5h-5v-5zM3 18h5v5H3v-5zm7 0h5v5h-5v-5zm7 0h5v5h-5v-5z" />
              </svg>
            </button>
            <button
              className={`mode-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
              title="List"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
              </svg>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="sort-selector">
            <label htmlFor="sort-by">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort memories by"
            >
              <option value="serial">Serial</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      </header>

      {/* Gallery Grid/List */}
      <div className={`gallery-container ${viewMode}`}>
        {sortedMemories.map((memory, index) =>
          viewMode === "list"
            ? renderListItem(memory, index)
            : renderGridItem(memory, index),
        )}
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <button
              className="modal-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                navigateModal("prev");
              }}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" width="36" height="36">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <div className="modal-image-container">
              {!imageLoaded && <div className="modal-spinner"></div>}
              <img
                src={
                  sortedMemories[modalImageIndex].img_xl ||
                  sortedMemories[modalImageIndex].img_lg
                }
                alt={sortedMemories[modalImageIndex].title}
                className={`modal-image ${imageLoaded ? "loaded" : ""}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <button
              className="modal-nav next"
              onClick={(e) => {
                e.stopPropagation();
                navigateModal("next");
              }}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" width="36" height="36">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
            <div className="modal-caption">
              <h2>{sortedMemories[modalImageIndex].title}</h2>
              <p>
                {modalImageIndex + 1} / {sortedMemories.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memories;
