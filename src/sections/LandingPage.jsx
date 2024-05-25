import { Nav } from "../components";
import CustomerReviews from "./LandingPage/CustomerReviews";
import Footer from "./Footer";
import Hero from "./LandingPage/Hero";
import PopularProducts from "./LandingPage/PopularProducts";
import Services from "./LandingPage/Services";
import SpecialOffer from "./LandingPage/SpecialOffer";
import Subscribe from "./LandingPage/Subscribe";
import SuperQuality from "./LandingPage/SuperQuality";

const LandingPage = () => {
  return (
    <main className="relative">
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopularProducts />
      </section>
      <section className="padding">
        <SuperQuality />
      </section>
      <section className="padding-x py-10">
        <Services />
      </section>
      <section className="padding">
        <SpecialOffer />
      </section>
      <section className="bg-pale-blue padding">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full">
        <Subscribe />
      </section>
      <section className=" bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </main>
  );
};

export default LandingPage;
