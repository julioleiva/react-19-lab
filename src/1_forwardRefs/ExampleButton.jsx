function ExampleButton(props, ref) {
  return (
    <button ref={ref} {...props}>
      {props.children}
    </button>
  );
}

export default ExampleButton;