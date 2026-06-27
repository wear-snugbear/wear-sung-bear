export default function FoundingCircle() {
  const [offer, setOffer] = useState({ active_offer: "Loading...", description: "" });

  // Replace your useEffect with this for better flexibility
useEffect(() => {
  const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5173" 
    : "https://snugbear-backend-dosj.onrender.com";

  fetch(`${API_URL}/api/offers`)
    .then(res => res.json())
    .then(data => setOffer(data))
    .catch(err => console.error("Error fetching offers:", err));
}, []);

  return (
    <div className="p-20 text-center">
      <h1 className="text-5xl font-black">{offer.active_offer}</h1>
      <p className="mt-4">{offer.description}</p>
    </div>
  );
}