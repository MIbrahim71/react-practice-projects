import ImageSlider from "./components/ImageSlider/ImageSlider";
import LoadMore from "./components/LoadMore/LoadMore";
import StarReviews from "./components/StarReviews/StarReviews";
import Accordion from "./components/Accordion/Accordion";

function App() {
  return (
    <main className="background">
      {/* <Accordion /> */}
      {/* <StarReviews noOfStars={5} /> */}
      {/* <ImageSlider url={"https://picsum.photos/v2/list"} limit={"4"} /> */}
      <LoadMore url={"https://dummyjson.com/products"} limit={20} skip={0} />
    </main>
  );
}

export default App;
