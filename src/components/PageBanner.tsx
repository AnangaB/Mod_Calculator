//Component for the top part of the webpage
//inlcudes the header and a short description
const PageBanner = () => {
  return (
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-4">Mod Calculator</h1>
        <p className="lead pb-5">
          This calculator lets you do addition, multiplication, subtraction,
          divisions and exponentiation, in the mod n, of your choice. Abitratry
          precision is built in, so there is support for most large number
          computation. (Currently the log button is not working)
        </p>
      </div>
    </div>
  );
};
export default PageBanner;