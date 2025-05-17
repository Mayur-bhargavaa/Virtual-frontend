import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = (id) => {
    setUserId(id);
    localStorage.setItem("userId", id);
    fetchUserProfile(id); // Fetch profile data when user logs in
  };

  const logout = () => {
    setUserId(null);
    setProfileImage(null);
    setUserName(null);
    localStorage.removeItem("userId");
    window.location.reload();
  };

  // Function to generate avatar
  const generateAvatar = (firstName) => {
    if (!firstName) return;

    // Take the first letter of the first name
    const firstLetter = firstName.charAt(0).toUpperCase();

    // Generate a random color for the background
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return {
      text: firstLetter,
      backgroundColor: randomColor,
    };
  };

  // Fetch the user profile image and name
  const fetchUserProfile = async (userId) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/user/${userId}`);
      const data = await res.json();
      if (res.ok) {
        // Generate and set the avatar if no profileImage is provided
        const avatar = generateAvatar(data.firstName);
        setProfileImage(avatar); // Set the dynamically generated avatar
        setUserName(`${data.firstName} ${data.lastName}`);
      } else {
        console.error(data.message); // Handle errors
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      login(storedUserId); // Automatically log in if userId is found in localStorage
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId, profileImage, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
