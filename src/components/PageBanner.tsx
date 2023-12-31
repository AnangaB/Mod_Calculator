//Component for the top part of the webpage
//inlcudes the header and a short description
const PageBanner = () => {
  return (
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-4">Mod Calculator</h1>
        <p className="lead">
          Perform complex mathematical operations with ease using the Mod
          Calculator. Whether it's addition, multiplication, subtraction,
          division, or exponentiation, this calculator allows you to operate
          within a specified modulo (n) of your choice. With a focus on
          efficiency, the calculator utilizes Number Theoretic Algorithms,
          including the Extended Euclidean Algorithm, Square and Multiply, and
          the Euler Totient function.
        </p>
        <div className="alert alert-danger" role="alert">
          <strong>Note:</strong> The log button is currently not functional and
          will be added as a feature in a future update.
        </div>
      </div>
    </div>
  );
};
export default PageBanner;
