import { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // To reference the dropdown container

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={toggleDropdown}
        className="dropbtn"
        style={{ margin: "0" }}
      >
        {label}
        <img
          style={{ margin:0, marginLeft:"0.5rem", width:"2rem"}}
          
          src={"/assets/img/arr-menu.svg"}
          alt=""
        />
      </button>
      {isOpen && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#e85556",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          {links.map((link, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "#007BFF",
                  padding: "10px",
                  gap: "1rem",
                }}
              >
                {link.icon && 
                
                <img
                  src={link.icon}
                  alt="icon"
                  style={{ margin: 0, width: "20px", height: "20px" }}
                />
                }
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
