export default function ErrorsComponent(props) {
  const { error } = props;
  if (!error) return;
  const handleErrors = () => {
    return Object.keys(error).map((item, index) => (
      <p className="error" key={index}>
        {error[item]}
      </p>
    ));
  };

  return <div>{handleErrors()}</div>;
}
