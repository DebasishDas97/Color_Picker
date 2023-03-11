import ErrorImage from "../images/error.png"
export default function Error(){
  return (
    <section className="error flex flex-col p-4 items-center font-semibold">
      <img src={ErrorImage} alt="error" />
      <h2>Oh No🙇‍♂️!</h2>
      <p>
        Sorry, the colour is invalid.
      </p>
    </section>
  );
};

