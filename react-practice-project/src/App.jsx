import ImageSlider from "./components/ImageSlider/ImageSlider";
import StarReviews from "./components/StarReviews/StarReviews";

function App() {
  return (
    <main className="background">
      {/* <Accordion /> */}
      {/* <StarReviews noOfStars={5} /> */}
      <ImageSlider url={"https://picsum.photos/v2/list"} limit={"4"} />
    </main>
  );
}

export default App;
