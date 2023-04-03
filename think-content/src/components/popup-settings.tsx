import React from "react";
import { BsX } from "react-icons/bs";

interface PopupWindowProps {
  handleClose: () => void;
}

const PopupWindow: React.FC<PopupWindowProps> = ({ handleClose }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
        <div className="relative z-20 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <BsX className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-6">
            <h2 className="mb-4 text-xl font-semibold">Popup Title</h2>
            <form>
              <div className="flex flex-col mb-4">
                <label htmlFor="input1" className="mb-2 font-medium">
                  Input 1
                </label>
                <input
                  type="text"
                  id="input1"
                  className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="input2" className="mb-2 font-medium">
                  Input 2
                </label>
                <input
                  type="text"
                  id="input2"
                  className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="select1" className="mb-2 font-medium">
                  Select 1
                </label>
                <select
                  id="select1"
                  className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;
