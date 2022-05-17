export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabPanel${index}`}
      aria-labelledby={`tabPanel${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
