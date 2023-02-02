import { useRef } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "styled-components";


const Container = styled.div`
    padding: 0;

    form {
        display: flex;
        flex-direction: row;
    }

    @media(max-width: 989px) {
      form {
        flex-direction: column;
      }
    }

    form input {
        background-color: transparent;
        padding: 0;
        border-bottom: 2.5px dotted black;
        height: 25px;
        flex-grow: 1;
        padding: 0;
        margin: 0 5px -2px 5px;
    }

    form input::placeholder {
        color: black;
    }

    form input:focus {
        outline: none;
        border-bottom: 2.5px dotted #70706f;
    }

    .text-input.error {
      border-bottom: 2.5px dotted red;
    }

    .error-label {
      position: absolute;
      right: 10px;
      color: #70706f;
      pointer-events: none;
    }


    .checkbox {
        display: flex;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .checkbox > input {
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        border-radius: 999px;
        -webkit-appearance: none;
        border: 1px solid #AC9E95;
        margin-right: 25px;
    }

    .checkbox > input:checked {
        background: #b0b0b0;
    }

    button {
        display: flex;
        align-items center;
        -webkit-appearance: none;
        border: none;
        background: none;
        width: fit-content;
        margin: 0 0 0 20px;
    }

    @media(max-width: 989px) {
      button {
        margin: 20px 0 0 0;
      }
    }

    button:hover #circle {
      background-color: #70706f;
    }
`;

const Input = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin-left: 20px;

    @media(max-width: 989px) {
      margin-left: 0;
    }
`

const Circle = styled.div`
    display: inline-block;
    height: 15px;
    width: 15px;
    min-height: 15px;
    min-width: 15px;
    border: 1px solid black;
    border-radius: 999px;
    margin: 2px 0 0 5px;
`



const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <Input>
      <label htmlFor={props.id || props.name} className="medium-font-size"><p>{label}:</p></label>
      <input className={meta.touched && meta.error ? "text-input error medium-font-size" : "text-input medium-font-size"} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </Input>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const Submit = ({ children, ...props}) => {
    const {isValid, touched } = useFormikContext();
    let isActive = false

    if(isValid === true && Object.entries(touched).length !== 0) {
        isActive = true
    } else {
        isActive = false
    }


    return (
        <button type="submit" id="submit-button-footer">
            {children}
        </button>
    )
}

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = ({ data }) => {

  let newsletterFormRef = useRef();

  const addEmailToList = async (values) => {
    let dataObj = {
      name: values.name,
      email: values.email
    }

  //   setTimeout(() => {

  //   document.querySelectorAll(".text-input").forEach(item => {
  //     item.value="";
  //     // item.placeholder="Thanks for subscribing!";
  //   })

  //   // document.querySelector("#submit-button").innerText = "✓"
  //   newsletterFormRef.current.children[0].children[2].innerText = "✓"
  // }, 1000)


  try {
      const res = await fetch("/api/subscribe", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(dataObj)
      })
      .then((response) => response.json())
      .then(data => {
        console.log(data)
        if(data.result !== "error") {
          document.querySelectorAll(".text-input").forEach(item => {
            item.value="";
            document.querySelector("#submit-button-footer").innerText = "✓"
            // item.placeholder="Thanks for subscribing!";
          })
        } else {
          document.querySelectorAll(".text-input").forEach(item => {
            item.value="";
            document.querySelector("#submit-button-footer").innerText = data.error
            // item.placeholder = data.message;
          })
        }
      })
    } catch (error) {
          alert(error);
    }
  }

  return (
    <Container ref={newsletterFormRef}>
      <Formik
        initialValues={{
          name: "",
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid")
            .required("Required"),
          name: Yup.string()
            .required("Required")            
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // await new Promise(r => setTimeout(r, 500));
          // setSubmitting(false);
          addEmailToList(values);
        }}
      >
        <Form>    
            <MyTextInput
            label={data.namePlaceholder}
            name="name"
            type="text"
            placeholder={""}
            />                                  
            <MyTextInput
            label={data.emailPlaceholder}
            name="email"
            type="email"
            placeholder={""}
            />       
            <Submit>{data.submitButtonText}<Circle id="circle" /></Submit>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignupForm
