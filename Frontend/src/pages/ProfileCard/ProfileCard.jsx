import { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileCard.css";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileCard() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
    bio: "",
    bloodGroup: "",
    socialLinks: [],
    secretKey: "",
    img: ""
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile/list`)
      .then(res => {
        if (res.data.success) {
          setProfiles(res.data.data);
          setFilteredProfiles(res.data.data);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to load profiles");
      });
  };

  useEffect(() => {
    let data = profiles;
    if (nameFilter) {
      data = data.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }
    if (idFilter) {
      data = data.filter(p => p.studentId.toLowerCase().includes(idFilter.toLowerCase()));
    }
    if (bloodFilter) {
      data = data.filter(p => p.bloodGroup === bloodFilter);
    }
    setFilteredProfiles(data);
  }, [nameFilter, idFilter, bloodFilter, profiles]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSocialLink = () => {
    setNewProfile(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }]
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...newProfile.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setNewProfile(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  const removeSocialLink = (index) => {
    const updatedLinks = newProfile.socialLinks.filter((_, i) => i !== index);
    setNewProfile(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  const handleAddProfile = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      
      formData.append('name', newProfile.name);
      formData.append('studentId', newProfile.studentId);
      formData.append('email', newProfile.email);
      formData.append('phone', newProfile.phone);
      formData.append('bio', newProfile.bio);
      formData.append('bloodGroup', newProfile.bloodGroup);
      formData.append('secretKey', newProfile.secretKey);
      formData.append('socialLinks', JSON.stringify(newProfile.socialLinks));
      
      if (file) {
        formData.append('img', file);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setShowAddModal(false);
        setNewProfile({
          name: "",
          studentId: "",
          email: "",
          phone: "",
          bio: "",
          bloodGroup: "",
          socialLinks: [],
          secretKey: "",
          img: ""
        });
        setFile(null);
        fetchProfiles();
      } else {
        throw new Error(response.data.message || "Failed to add profile");
      }
    } catch (error) {
      console.error("Add profile error:", error);
      setError(error.response?.data?.message || 
              error.message || 
              "Failed to add profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProfileImage = (profile) => {
    if (profile.img) {
      return (
        <img 
          src={profile.img} 
          alt={profile.name} 
          className="prfcd-image" 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="prfcd-container">
      <div className="prfcd-header">
        <h2 className="prfcd-title">Student Profiles</h2>
        <button 
          className="prfcd-add-button"
          onClick={() => setShowAddModal(true)}
        >
          Add Your Profile 
        </button>
      </div>

      <p className="prfcd-info">
        Creating a student profile allows others to quickly find your basic details,
        connect with you, and reach out in case of emergencies. Please provide
        accurate information so your profile is useful to the community.
      </p>

      {error && <div className="prfcd-error">{error}</div>}

      <div className="prfcd-filters">
        <input 
          type="text" 
          placeholder="Filter by Name" 
          value={nameFilter} 
          onChange={e => setNameFilter(e.target.value)} 
          className="prfcd-input" 
        />
        <input 
          type="text" 
          placeholder="Filter by ID" 
          value={idFilter} 
          onChange={e => setIdFilter(e.target.value)} 
          className="prfcd-input" 
        />
        <select 
          value={bloodFilter} 
          onChange={e => setBloodFilter(e.target.value)} 
          className="prfcd-select"
        >
          <option value="">All Blood Groups</option>
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

      <div className="prfcd-list">
        {filteredProfiles.map(profile => (
          <div 
            key={profile._id} 
            className="prfcd-card" 
            onClick={() => navigate(`/user/${profile._id}`)}
          >
            <div className="prfcd-image-container">
              {getProfileImage(profile)}
              <FaUserCircle className="prfcd-fallback-icon" />
            </div>
            <h3 className="prfcd-name">{profile.name}</h3>
            <p className="prfcd-id">ID: {profile.studentId}</p>
            <p className="prfcd-blood">Blood Group: {profile.bloodGroup}</p>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="prfcd-modal">
          <div className="prfcd-modal-content">
            <h3>Add New Profile</h3>
            <div className="prfcd-modal-form">
              <div className="form-group">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={newProfile.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Student ID*</label>
                <input
                  type="text"
                  name="studentId"
                  value={newProfile.studentId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  value={newProfile.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={newProfile.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Blood Group*</label>
                <select
                  name="bloodGroup"
                  value={newProfile.bloodGroup}
                  onChange={handleInputChange}
                  required
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
              <div className="form-group" style={{ position: "relative" }}>
  <label>Secret Key* (Required for future edits)</label>
  <input
    type={showPassword ? "text" : "password"}
    name="secretKey"
    value={newProfile.secretKey}
    onChange={handleInputChange}
    required
    style={{ paddingRight: "2.5rem" }} 
  />
  <span
    className="password-toggle"
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "1.2rem",
      color: "#555"
    }}
  >
    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
  </span>
</div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={newProfile.bio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Profile Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <div className="form-group">
                <label>Social Links</label>
                {newProfile.socialLinks.map((link, index) => (
                  <div key={index} className="social-link-group">
                    <input
                      type="text"
                      placeholder="Platform"
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
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
                  Add Social Link
                </button>
              </div>
            </div>
            <div className="prfcd-modal-actions">
              <button
                onClick={handleAddProfile}
                disabled={isSubmitting}
                className="save-button"
              >
                {isSubmitting ? "Saving..." : "Save Profile"}
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}