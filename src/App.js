import "./styles.css";
import Form from "./Components/Form";

export default function App() {
  const formFields = [
    {
      id: "first-name",
      type: "text",
      label: "First Name",
      name: "firstName",
      validate: "isAlpha",
      errorMessage: "Please add valid First Name",
      required: true
    },
    {
      id: "last-name",
      type: "text",
      label: "Last Name",
      name: "lastName",
      validate: "isAlpha",
      errorMessage: "Please add valid Last Name",
      required: true
    },
    {
      id: "email",
      type: "text",
      label: "Email",
      name: "email",
      validate: "isEmail",
      errorMessage: "Please add valid Email address",
      required: true
    },
    {
      id: "company-name",
      type: "text",
      label: "Company Name",
      name: "companyName",
      validate: "isAlphanumeric",
      errorMessage: "Please add valid Company Name"
    },
    {
      id: "current-software",
      type: "select",
      label: "What tax software do you currently use",
      name: "currentSoftware",
      validate: "isAlphanumeric",
      errorMessage: "Please add valid Company Name",
      options: [
        {
          name: "Please Select",
          value: ""
        },
        {
          name: "No current Solution",
          value: "No current Solution"
        },
        {
          name: "ProFile",
          value: "ProFile"
        },
        {
          name: "CanTax",
          value: "CanTax"
        },
        {
          name: "TaxCycle",
          value: "TaxCycle"
        },
        {
          name: "TaxPrep",
          value: "TaxPrep"
        },
        {
          name: "DTMax",
          value: "DTMax"
        },
        {
          name: "Visual Tax",
          value: "VisualTax"
        },
        {
          name: "Studio Tax",
          value: "StudioTax"
        },
        {
          name: "TurboTax",
          value: "TurboTax"
        },
        {
          name: "Student",
          value: "Student"
        }
      ]
    },
    {
      id: "personal-returns",
      type: "text",
      label: "How many personal returns do you prepare annually?",
      validate: "isNumeric",
      errorMessage: "Must be a valid number"
    },
    {
      id: "business-returns",
      type: "text",
      label: "How many business returns do you prepare annually?",
      validate: "isNumeric",
      errorMessage: "Must be a valid number"
    }
  ];
  return (
    <div className="App">
      <Form formFields={formFields} />
    </div>
  );
}
