import { useEffect, useState } from "react";
import AddSpacecraft from "../components/add-spacecraft";
import Header from "../components/header";
import Line from "../components/line";

const Spacecrafts = () => {
  const headerElementsSpacecraft = ["Name", "Maximum speed", "Mass"];
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getAllSpacecrafts = async () => {
    await fetch(`http://localhost:8080/api/spacecrafts`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSpacecrafts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllSpacecrafts();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="flex justify-between">
              <button
                type="button"
                class="mt-10 invisible text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Back
              </button>
              <button
                type="button"
                class="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setShowModal(true)}
              >
                Add spacecraft
              </button>
            </div>
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <Header headerElements={headerElementsSpacecraft} />
                <tbody className="text-gray-600 text-sm font-light">
                  {spacecrafts.map((spacecraft) => (
                    <Line spacecraft={spacecraft} getAll={getAllSpacecrafts} />
                  ))}
                </tbody>
              </table>
            </div>
            {showModal && <AddSpacecraft setShowModal={setShowModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spacecrafts;
