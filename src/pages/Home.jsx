import Card from "../components/Card";
import TextClock from "../components/TextClock";

export default function Home() {
  const appDescriptions = [
    {
      title: "Task Manager",
      imgSrc: "/assets/taskmanager.png",
      content: "A simple to-do app for adding, editing, marking, and deleting tasks.Helps users stay organized with a clean, minimal UI."
    },
    {
      title: "Weather App",
      imgSrc: "/assets/weathericon.png",
      content: "A real-time weather tracker that shows the current conditions and a 7-day forecast for any city. It displays temperature, humidity, wind, and dynamic backgrounds based on the weather."
    },
    {
      title: "Note-Taking App",
      imgSrc:"assets/notetaker.png",
      content: "A lightweight notes manager where users can write, edit, save, and delete notes.Perfect for quick reminders or jotting ideas without needing an account."
    },
    {
      title: "Expense Splitter",
      imgSrc:"assets/expenseSplitter.png",
      content: "A simple tool that divides expenses between multiple people. Enter the total cost and number of participants, and the app instantly calculates what each person should pay."
    },
    {
      title: "E-Commerce Product Viewer",
      imgSrc:"assets/e-commerce.png",
      content: "Fetches live product data from an API and displays items with images, prices, ratings, and categories. Supports search and category filtering for easier browsing."
    },
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome to Mini Tools Suite</h2>
      <p className="mb-6 text-gray-600 text-center">Select a tool from the navigation bar to begin.</p>
      <TextClock />
      <div className="flex flex-col gap-2 
      sm:grid sm:grid-cols-2
      lg:grid-cols-4">
        {appDescriptions.map(desc => <Card title={desc.title} content={desc.content} imgSrc={desc.imgSrc}/>)}
      </div>
    </div >
  );
}