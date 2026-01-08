import { useState, useEffect } from "react";
import axios from "axios";
import "./UserInfoFromCard.css";
import { useParams } from "react-router-dom";

export default function UserInfoFromCard() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSecretPopup, setShowSecretPopup] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
    bio: "",
    bloodGroup: "",
    socialLinks: [],
    img: "",
    secretKey: "",          
    confirmSecretKey: ""    
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile/single/${id}`);
        if (res.data.success) {
          setProfile(res.data.data);
          setFormData({
            name: res.data.data.name,
            studentId: res.data.data.studentId,
            email: res.data.data.email,
            phone: res.data.data.phone,
            bio: res.data.data.bio || "",
            bloodGroup: res.data.data.bloodGroup,
            socialLinks: res.data.data.socialLinks || [],
            img: res.data.data.img || "",
            secretKey: "",
            confirmSecretKey: ""
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, [id]);

  const handleEditCheck = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/verify/${id}`,
        { secretKey }
      );
      if (res.data.success) {
        setIsEditing(true);
        setSecretKey("");
        setShowSecretPopup(false);
      }
    } catch (err) {
      alert("Invalid secret key");
      console.log("Verification error:", err);
      setSecretKey("");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (formData.secretKey && formData.secretKey !== formData.confirmSecretKey) {
      setError("Secret key and confirmation do not match");
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name);
      formDataToSend.append('studentId', formData.studentId);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('bloodGroup', formData.bloodGroup);
      formDataToSend.append('socialLinks', JSON.stringify(formData.socialLinks));
      if (formData.secretKey && formData.secretKey.trim() !== "") {
        formDataToSend.append('secretKey', formData.secretKey);
      }

      if (file) {
        formDataToSend.append('img', file);
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/update/${id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setProfile(response.data.data);
        setIsEditing(false);
        setFile(null);
        alert("Profile updated successfully!");
        // refresh profile data
        setFormData(prev => ({ ...prev, secretKey: "", confirmSecretKey: "" }));
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: "", url: "" }]
    });
  };

  const removeSocialLink = (index) => {
    const updatedLinks = formData.socialLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, socialLinks: updatedLinks });
  };


  if (!profile) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      {showSecretPopup && (
        <div className="secret-popup">
          <div className="popup-content">
            <h3>Enter Secret Key</h3>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Your secret key"
            />
            <div className="popup-buttons">
              <button onClick={handleEditCheck} disabled={!secretKey.trim()}>
                Verify
              </button>
              <button onClick={() => setShowSecretPopup(false)}>Cancel</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <button
                className="forgot-btn"
                onClick={async () => {
                  if (!window.confirm(
                    "If you continue, a new secret key will be sent to admin. You must collect it from admin. Continue?"
                  )) return;

                  try {
                    const res = await axios.post(
                      `${import.meta.env.VITE_API_BASE_URL}/api/profile/reset-secret/${id}`
                    );
                    alert(res.data.message);
                    setShowSecretPopup(false);
                  } catch (err) {
                    alert("Failed to reset secret key");
                    console.error("Reset secret error:", err);
                  }
                }}
              >
                Forgot Secret Key?
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-edit-button">
        <button onClick={() => setShowSecretPopup(true)}>
          Edit Profile
        </button>
      </div>

      {error && <div className="profile-error">{error}</div>}

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-image-container">
            <img
              src={profile.img || "https://via.placeholder.com/300"}
              alt={profile.name}
              className="profile-image"
            />
            {isEditing && (
              <div className="image-upload">
                <label htmlFor="profile-upload">Change Photo</label>
                <input
                  id="profile-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            )}
          </div>
        </div>

        <div className="profile-right">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Change Secret (optional)</label>
                <input
                  type="password"
                  placeholder="New secret"
                  value={formData.secretKey}
                  onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Confirm new secret"
                  value={formData.confirmSecretKey}
                  onChange={(e) => setFormData({ ...formData, confirmSecretKey: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <div className="core-info">
              <h1 className="profile-name">{profile.name}</h1>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Student ID</span>
                  <span className="info-value">{profile.studentId}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{profile.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{profile.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Blood Group</span>
                  <span className="info-value">{profile.bloodGroup}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="profile-bottom">
        {isEditing ? (
          <div className="edit-social-links">
            <h3>Social Links</h3>
            {formData.socialLinks.map((link, index) => (
              <div key={index} className="social-link-edit">
                <input
                  type="text"
                  value={link.platform}
                  onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                  placeholder="Platform"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                  placeholder="URL"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="remove-link"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSocialLink}
              className="add-link"
            >
              + Add Social Link
            </button>
          </div>
        ) : (
          <>
            {profile.bio && (
              <div className="profile-bio">
                <h3>Bio</h3>
                <p>{profile.bio}</p>
              </div>
            )}

            {profile.socialLinks?.length > 0 && (
              <div className="profile-social">
                <h3>Social Links</h3>
                <div className="social-links">
                  {profile.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      {link.platform || 'Social Link'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {isEditing && (
          <div className="edit-actions">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="save-button"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
