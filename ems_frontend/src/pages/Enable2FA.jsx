import React, { useState } from "react";
import axios from "axios";
import EnableIcon from "../assets/CC-icon-removebg-preview.png";
import { enable2FA } from "../redux/actions/authActions";
import { useSelector } from "react-redux";
import SecurityLock from "../assets/security-safety-lock-icon-vector-45499329-removebg-preview.png";

const Enable2FA = () => {
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);

  const { authUser } = useSelector((state) => state.auth);

  const callEnable2FA = async () => {
    try {
      const response = await enable2FA(authUser?.sub); // Await the Promise
      setQrCode(response.secretImageUri); // Set the QR code
      setError(null);
    } catch (err) {
      setError("Error enabling 2FA. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 m-4 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Two-Factor Authentication
        </h2>

        {authUser.mfaEnable ? (
          <div>
              <img className="w-40 h-40 mx-auto" src={SecurityLock} alt="Security Lock" />
              <p className="text-gray-800 dark:text-gray-300">
                You All Ready Enable Two Factor Authentication
              </p>
          </div>
        ) : (
          <div>
            {qrCode ? (
              <div className="text-center">
                <p className="text-gray-800 dark:text-gray-300">
                  Scan the QR code below with your authenticator app:
                </p>
                <div className=" bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
                  <img
                    className="w-48 h-48 mx-auto"
                    src={qrCode}
                    alt="QR Code"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-800 dark:text-gray-300 mb-4">
                  To enable 2FA, click the button below:
                </p>
                <img
                  src={EnableIcon}
                  alt="Enable 2FA"
                  className="w-32 h-32 mx-auto"
                />
                <button
                  onClick={callEnable2FA}
                  className="w-full text-center py-3 rounded-md text-white bg-primary dark:bg-purple-700 hover:bg-primary-dark dark:hover:bg-purple-900 transition duration-300"
                >
                  Enable
                </button>
              </div>
            )}
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Enable2FA;
