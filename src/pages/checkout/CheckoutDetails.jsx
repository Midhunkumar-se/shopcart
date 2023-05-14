import { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import "./CheckoutDetails.scss";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const { name, line1, line2, city, state, postal_code, country, phone } =
    useSelector(selectShippingAddress);
  const [submitted, setSubmit] = useState(false);

  const dispatch = useDispatch();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  function edit() {
    setSubmit(false);
  }

  useEffect(() => {
    if (name) {
      setSubmit(true);
      setShippingAddress({
        name,
        line1,
        line2,
        city,
        state,
        postal_code,
        country,
        phone,
      });
    }
  }, [name, line1, line2, city, state, postal_code, country, phone]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(shippingAddress));
    setSubmit(true);
  };

  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <Card>
      <div className="form-checkout">
        <form onSubmit={handleSubmit}>
          <div className="form-checkout__header">
            <h4>Delivery Information</h4>
            {!submitted ? (
              <button type="submit" className="form-checkout__btn">
                Save information
              </button>
            ) : (
              <p onClick={edit} className="form-checkout__btn">
                Edit
              </p>
            )}
          </div>

          {!submitted && (
            <div className="form-checkout__controls">
              <div className="--form-control">
                <label>Recipient Name*</label>
                <input
                  type="text"
                  placeholder="Recipient Name"
                  required
                  name="name"
                  value={shippingAddress.name}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <div className="form-checkout__flex">
                <div className="--form-control">
                  <label>Address line 1*</label>
                  <input
                    type="text"
                    placeholder="Address line 1"
                    required
                    name="line1"
                    value={shippingAddress.line1}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div className="--form-control">
                  <label>Address line 2*</label>
                  <input
                    type="text"
                    placeholder="Address line 2"
                    name="line2"
                    value={shippingAddress.line2}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
              </div>
              <div className="form-checkout__flex">
                <div className="--form-control">
                  <label>City*</label>
                  <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div className="--form-control">
                  <label>State*</label>
                  <input
                    type="text"
                    placeholder="State"
                    required
                    name="state"
                    value={shippingAddress.state}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
              </div>

              <div className="form-checkout__flex">
                <div className="--form-control">
                  <label>Postal code*</label>
                  <input
                    type="text"
                    placeholder="Postal code"
                    required
                    name="postal_code"
                    value={shippingAddress.postal_code}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                {/* COUNTRY INPUT */}
                <CountryDropdown
                  className="form-checkout__select"
                  valueType="short"
                  value={shippingAddress.country}
                  onChange={(val) =>
                    handleShipping({
                      target: {
                        name: "country",
                        value: val,
                      },
                    })
                  }
                />
              </div>
              <div className="--form-control">
                <label>Phone* </label>
                <input
                  type="text"
                  placeholder="Phone"
                  required
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
            </div>
          )}
          {submitted && (
            <div className="form-checkout__full-address">
              <p>{name}</p>
              <div>
                {capitalizeFirstLowercaseRest(line1)},{" "}
                {capitalizeFirstLowercaseRest(line2)},{" "}
                {capitalizeFirstLowercaseRest(city)},{" "}
                {capitalizeFirstLowercaseRest(state)},{" "}
                {capitalizeFirstLowercaseRest(postal_code)}
              </div>
              <div>
                {country} (+91) {phone}
              </div>
            </div>
          )}
        </form>
      </div>
    </Card>
  );
};

export default CheckoutDetails;
