"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

type ServiceOption = {
  name: string;
  specializations: string[];
};

type SelectedService = {
  service: string;
  customService: string;
  specializations: string[];
  customSpecializations: string[];
};

type FormDataState = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  gender: string;
  nationality: string;
  state: string;
  addressType: string;

  idType: string;
  idNumber: string;
  idDocument: File | null;
  passportPhoto: File | null;

  highestEducation: string;
  fieldOfStudy: string;
  educationDocument: File | null;

  isLicensed: string;
  licenseName: string;
  licenseDocument: File | null;

  serviceDescription: string;

  latitude: string;
  longitude: string;
};

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    name: "Engineering",
    specializations: [
      "Civil Engineering",
      "Computer Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Chemical Engineering",
      "Environmental Engineering",
      "Industrial Engineering",
      "Software Engineering",
    ],
  },
  {
    name: "Medicine",
    specializations: [
      "Medicine & Surgery",
      "Pharmacy",
      "Psychology",
      "Physiotherapy",
      "Dentistry",
      "Nursing",
      "Radiography",
      "Medical Laboratory Science",
      "Optometry",
      "Public Health",
      "Nutrition & Dietetics",
    ],
  },
];

const COUNTRY_OPTIONS = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
];

const STATES_BY_COUNTRY: Record<string, string[]> = {
  Nigeria: [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Federal Capital Territory",
  ],
  Ghana: [
    "Greater Accra",
    "Ashanti",
    "Eastern",
    "Western",
    "Central",
    "Northern",
    "Volta",
  ],
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Machakos"],
  "South Africa": [
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Eastern Cape",
    "Free State",
    "Limpopo",
  ],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "United States": [
    "California",
    "Texas",
    "New York",
    "Florida",
    "Georgia",
    "Illinois",
  ],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
};

const EMPTY_SERVICE: SelectedService = {
  service: "",
  customService: "",
  specializations: [],
  customSpecializations: [],
};

const INITIAL_FORM: FormDataState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  gender: "",
  nationality: "",
  state: "",
  addressType: "",

  idType: "",
  idNumber: "",
  idDocument: null,
  passportPhoto: null,

  highestEducation: "",
  fieldOfStudy: "",
  educationDocument: null,

  isLicensed: "",
  licenseName: "",
  licenseDocument: null,

  serviceDescription: "",

  latitude: "",
  longitude: "",
};

export default function ProviderRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const verifiedEmail = searchParams.get("email") || "";

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([
    { ...EMPTY_SERVICE },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentCountryStates = useMemo(() => {
    return STATES_BY_COUNTRY[formData.nationality] || [];
  }, [formData.nationality]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((previous) => ({
          ...previous,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));

        setLocationStatus("Location captured");
      },
      () => {
        setLocationStatus("Location permission was not granted.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  const updateField = <K extends keyof FormDataState>(
    field: K,
    value: FormDataState[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      const next = { ...previous };
      delete next[field as string];
      return next;
    });
  };

  const handleFileChange =
    (
      field:
        | "idDocument"
        | "passportPhoto"
        | "educationDocument"
        | "licenseDocument",
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      updateField(field, file);
    };

  const updateService = (
    serviceIndex: number,
    updates: Partial<SelectedService>,
  ) => {
    setSelectedServices((previous) =>
      previous.map((item, index) =>
        index === serviceIndex
          ? {
              ...item,
              ...updates,
            }
          : item,
      ),
    );
  };

  const addService = () => {
    if (selectedServices.length >= 5) return;

    setSelectedServices((previous) => [...previous, { ...EMPTY_SERVICE }]);
  };

  const removeService = (serviceIndex: number) => {
    if (selectedServices.length === 1) return;

    setSelectedServices((previous) =>
      previous.filter((_, index) => index !== serviceIndex),
    );
  };

  const addSpecialization = (serviceIndex: number) => {
    setSelectedServices((previous) =>
      previous.map((item, index) =>
        index === serviceIndex
          ? {
              ...item,
              specializations: [...item.specializations, ""],
            }
          : item,
      ),
    );
  };

  const removeSpecialization = (
    serviceIndex: number,
    specializationIndex: number,
  ) => {
    setSelectedServices((previous) =>
      previous.map((item, index) => {
        if (index !== serviceIndex) return item;

        return {
          ...item,
          specializations: item.specializations.filter(
            (_, currentIndex) => currentIndex !== specializationIndex,
          ),
        };
      }),
    );
  };

  const updateSpecialization = (
    serviceIndex: number,
    specializationIndex: number,
    value: string,
  ) => {
    setSelectedServices((previous) =>
      previous.map((item, index) => {
        if (index !== serviceIndex) return item;

        const specializations = [...item.specializations];
        specializations[specializationIndex] = value;

        return {
          ...item,
          specializations,
        };
      }),
    );
  };

  const addCustomSpecialization = (serviceIndex: number) => {
    setSelectedServices((previous) =>
      previous.map((item, index) =>
        index === serviceIndex
          ? {
              ...item,
              customSpecializations: [...item.customSpecializations, ""],
            }
          : item,
      ),
    );
  };

  const removeCustomSpecialization = (
    serviceIndex: number,
    specializationIndex: number,
  ) => {
    setSelectedServices((previous) =>
      previous.map((item, index) => {
        if (index !== serviceIndex) return item;

        return {
          ...item,
          customSpecializations: item.customSpecializations.filter(
            (_, currentIndex) => currentIndex !== specializationIndex,
          ),
        };
      }),
    );
  };

  const updateCustomSpecialization = (
    serviceIndex: number,
    specializationIndex: number,
    value: string,
  ) => {
    setSelectedServices((previous) =>
      previous.map((item, index) => {
        if (index !== serviceIndex) return item;

        const customSpecializations = [...item.customSpecializations];
        customSpecializations[specializationIndex] = value;

        return {
          ...item,
          customSpecializations,
        };
      }),
    );
  };

  const getAvailableServices = (currentIndex: number) => {
    const selectedOtherServices = selectedServices
      .filter((_, index) => index !== currentIndex)
      .map((item) =>
        item.service === "Other" ? item.customService.trim() : item.service,
      )
      .filter(Boolean);

    return SERVICE_OPTIONS.filter(
      (service) => !selectedOtherServices.includes(service.name),
    );
  };

  const validateStepOne = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!formData.dateOfBirth) {
      nextErrors.dateOfBirth = "Date of birth is required.";
    }

    if (!verifiedEmail) {
      nextErrors.email =
        "Verified email could not be found. Please restart registration.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!formData.gender) {
      nextErrors.gender = "Please select your gender.";
    }

    if (!formData.nationality) {
      nextErrors.nationality = "Please select your nationality.";
    }

    if (!formData.state) {
      nextErrors.state = "Please select your state.";
    }

    if (!formData.addressType.trim()) {
      nextErrors.addressType = "Please enter your address type.";
    }

    if (!formData.idType) {
      nextErrors.idType = "Please select an ID type.";
    }

    if (!formData.idNumber.trim()) {
      nextErrors.idNumber = "ID number is required.";
    }

    if (!formData.idDocument) {
      nextErrors.idDocument = "Please upload your ID document.";
    }

    if (!formData.passportPhoto) {
      nextErrors.passportPhoto = "Please upload your passport photograph.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const validateServices = () => {
    const nextErrors: Record<string, string> = {};

    selectedServices.forEach((item, index) => {
      const serviceValue =
        item.service === "Other"
          ? item.customService.trim()
          : item.service.trim();

      if (!serviceValue) {
        nextErrors[`service-${index}`] = "Please select or specify a service.";
      }

      const hasNormalSpecialization = item.specializations.some((value) =>
        value.trim(),
      );

      const hasCustomSpecialization = item.customSpecializations.some((value) =>
        value.trim(),
      );

      if (!hasNormalSpecialization && !hasCustomSpecialization) {
        nextErrors[`specialization-${index}`] =
          "Please add at least one area of specialization.";
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const validateStepTwo = () => {
    if (!validateServices()) {
      return false;
    }

    const nextErrors: Record<string, string> = {};

    if (!formData.highestEducation) {
      nextErrors.highestEducation =
        "Please select your highest level of education.";
    }

    if (
      formData.highestEducation === "other" &&
      !formData.fieldOfStudy.trim()
    ) {
      nextErrors.fieldOfStudy = "Please specify your field of study.";
    }

    if (!formData.isLicensed) {
      nextErrors.isLicensed = "Please indicate whether you are licensed.";
    }

    if (formData.isLicensed === "yes" && !formData.licenseName.trim()) {
      nextErrors.licenseName = "Please enter your license name.";
    }

    if (formData.isLicensed === "yes" && !formData.licenseDocument) {
      nextErrors.licenseDocument = "Please upload your license document.";
    }

    if (!formData.serviceDescription.trim()) {
      nextErrors.serviceDescription =
        "Please provide a brief description of your services.";
    }

    setErrors((previous) => ({
      ...previous,
      ...nextErrors,
    }));

    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStepOne()) return;
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === 2) {
      if (!validateStepTwo()) return;
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     if (!validateStepTwo()) {
  //       return;
  //     }

  //     setIsSubmitting(true);

  //     const registrationPayload = {
  //       email: verifiedEmail,
  //       personalDetails: {
  //         ...formData,
  //       },
  //       services: selectedServices
  //         .filter((item) => item.service || item.customService.trim())
  //         .map((item) => ({
  //           service:
  //             item.service === "Other" ? item.customService.trim() : item.service,
  //           isCustomService: item.service === "Other",
  //           specializations: item.specializations
  //             .filter((value) => value.trim())
  //             .map((value) => ({
  //               value,
  //               isCustom: false,
  //             })),
  //           customSpecializations: item.customSpecializations
  //             .filter((value) => value.trim())
  //             .map((value) => ({
  //               value,
  //               isCustom: true,
  //             })),
  //         })),
  //       submittedAt: new Date().toISOString(),
  //     };

  //     // Temporary registration simulation.
  //     console.log("Provider registration payload:", registrationPayload);

  //     await new Promise((resolve) => setTimeout(resolve, 800));

  //     setIsSubmitting(false);

  //     router.push("/provider/success");
  //   };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Temporary frontend-only flow.
    // Backend submission will be connected later.
    router.push("/provider/success");
  };

  return (
    <div className="provider-register">
      <Navbar />

      <main className="provider-register__main">
        <div className="provider-register__container">
          <header className="provider-register__header">
            <div className="provider-register__eyebrow">
              Provider Registration
            </div>

            <h1 className="provider-register__title">
              Build your professional profile
            </h1>

            <p className="provider-register__subtitle">
              Tell us about yourself, your professional services, and your
              qualifications.
            </p>

            <div
              className="provider-register__progress"
              aria-label={`Registration step ${currentStep} of 2`}
            >
              <div
                className={`provider-register__progress-step ${
                  currentStep >= 1
                    ? "provider-register__progress-step--active"
                    : ""
                }`}
              >
                <span className="provider-register__progress-number">1</span>
                <span className="provider-register__progress-text">
                  Personal & Identity
                </span>
              </div>

              <div className="provider-register__progress-line" />

              <div
                className={`provider-register__progress-step ${
                  currentStep >= 2
                    ? "provider-register__progress-step--active"
                    : ""
                }`}
              >
                <span className="provider-register__progress-number">2</span>
                <span className="provider-register__progress-text">
                  Professional Profile
                </span>
              </div>
            </div>
          </header>

          <form className="provider-register__form" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <section
                className="provider-register__panel provider-register__panel--personal"
                aria-labelledby="personal-details-title"
              >
                <div className="provider-register__section-header">
                  <div>
                    <span className="provider-register__section-kicker">
                      Step 1
                    </span>
                    <h2
                      id="personal-details-title"
                      className="provider-register__section-title"
                    >
                      Personal & identity details
                    </h2>
                    <p className="provider-register__section-description">
                      These details help us verify your identity and create your
                      provider profile.
                    </p>
                  </div>
                </div>

                <div className="provider-register__grid">
                  <div className="provider-register__field">
                    <label className="provider-register__label">
                      First name *
                    </label>
                    <input
                      className="provider-register__input"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <span className="provider-register__error">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="provider-register__field">
                    <label className="provider-register__label">
                      Last name *
                    </label>
                    <input
                      className="provider-register__input"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <span className="provider-register__error">
                        {errors.lastName}
                      </span>
                    )}
                  </div>

                  <div className="provider-register__field">
                    <label className="provider-register__label">
                      Date of birth *
                    </label>
                    <input
                      className="provider-register__input"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        updateField("dateOfBirth", e.target.value)
                      }
                    />
                    {errors.dateOfBirth && (
                      <span className="provider-register__error">
                        {errors.dateOfBirth}
                      </span>
                    )}
                  </div>

                  <div className="provider-register__field">
                    <label className="provider-register__label">
                      Verified email
                    </label>
                    <input
                      className="provider-register__input provider-register__input--readonly"
                      type="email"
                      value={verifiedEmail}
                      readOnly
                    />
                    {errors.email && (
                      <span className="provider-register__error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="provider-register__field">
                    <label className="provider-register__label">
                      Mobile number *
                    </label>
                    <div className="provider-register__phone">
                      <select
                        className="provider-register__phone-code"
                        aria-label="Country code"
                        defaultValue="+234"
                      >
                        <option value="+234">NG +234</option>
                        <option value="+233">GH +233</option>
                        <option value="+254">KE +254</option>
                        <option value="+27">ZA +27</option>
                        <option value="+44">UK +44</option>
                        <option value="+1">US/CA +1</option>
                      </select>

                      <input
                        className="provider-register__input provider-register__phone-input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          updateField(
                            "phone",
                            e.target.value.replace(/\D/g, ""),
                          )
                        }
                        placeholder="8012345678"
                      />
                    </div>
                    {errors.phone && (
                      <span className="provider-register__error">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="provider-register__field">
                    <label className="provider-register__label">Gender *</label>
                    <select
                      className="provider-register__select"
                      value={formData.gender}
                      onChange={(e) => updateField("gender", e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <span className="provider-register__error">
                        {errors.gender}
                      </span>
                    )}
                  </div>

                  <div className="provider-register__field">
                    <label className="provider-register__label">
                      Nationality *
                    </label>
                    <select
                      className="provider-register__select"
                      value={formData.nationality}
                      onChange={(e) => {
                        updateField("nationality", e.target.value);
                        updateField("state", "");
                      }}
                    >
                      <option value="">Select country</option>
                      {COUNTRY_OPTIONS.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.nationality && (
                      <span className="provider-register__error">
                        {errors.nationality}
                      </span>
                    )}
                  </div>

                  <div className="provider-register__field">
                    <label className="provider-register__label">
                      State / Region *
                    </label>
                    <select
                      className="provider-register__select"
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      disabled={!formData.nationality}
                    >
                      <option value="">
                        {formData.nationality
                          ? "Select state / region"
                          : "Select country first"}
                      </option>

                      {currentCountryStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <span className="provider-register__error">
                        {errors.state}
                      </span>
                    )}
                  </div>

                  <div className="provider-register__field provider-register__field--full">
                    <label className="provider-register__label">
                      Address type *
                    </label>
                    <input
                      className="provider-register__input"
                      type="text"
                      value={formData.addressType}
                      onChange={(e) =>
                        updateField("addressType", e.target.value)
                      }
                      placeholder="Permanent or Temporary"
                    />
                    {errors.addressType && (
                      <span className="provider-register__error">
                        {errors.addressType}
                      </span>
                    )}
                  </div>
                </div>

                <div className="provider-register__subsection">
                  <div className="provider-register__subsection-header">
                    <div>
                      <span className="provider-register__section-kicker">
                        Identity verification
                      </span>
                      <h3 className="provider-register__subsection-title">
                        Confirm your identity
                      </h3>
                    </div>
                  </div>

                  <div className="provider-register__grid">
                    <div className="provider-register__field">
                      <label className="provider-register__label">
                        Identification type *
                      </label>
                      <select
                        className="provider-register__select"
                        value={formData.idType}
                        onChange={(e) => updateField("idType", e.target.value)}
                      >
                        <option value="">Select identification type</option>
                        <option value="Drivers Licence">
                          Driver&apos;s Licence
                        </option>
                        <option value="International Passport">
                          International Passport
                        </option>
                        <option value="NIN">NIN</option>
                      </select>
                      {errors.idType && (
                        <span className="provider-register__error">
                          {errors.idType}
                        </span>
                      )}
                    </div>

                    <div className="provider-register__field">
                      <label className="provider-register__label">
                        ID number *
                      </label>
                      <input
                        className="provider-register__input"
                        type="text"
                        value={formData.idNumber}
                        onChange={(e) =>
                          updateField("idNumber", e.target.value)
                        }
                        placeholder="Enter your ID number"
                      />
                      {errors.idNumber && (
                        <span className="provider-register__error">
                          {errors.idNumber}
                        </span>
                      )}
                    </div>

                    <div className="provider-register__field">
                      <label className="provider-register__label">
                        Upload ID document *
                      </label>
                      <input
                        className="provider-register__file"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange("idDocument")}
                      />
                      {errors.idDocument && (
                        <span className="provider-register__error">
                          {errors.idDocument}
                        </span>
                      )}
                    </div>

                    <div className="provider-register__field">
                      <label className="provider-register__label">
                        Passport photograph *
                      </label>
                      <input
                        className="provider-register__file"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange("passportPhoto")}
                      />
                      {errors.passportPhoto && (
                        <span className="provider-register__error">
                          {errors.passportPhoto}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="provider-register__location-note">
                  <span className="provider-register__location-indicator" />
                  <div>
                    <strong>Service location</strong>
                    <p>
                      {locationStatus ||
                        "We will use your approximate location to improve provider matching."}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section
                className="provider-register__panel provider-register__panel--professional"
                aria-labelledby="professional-profile-title"
              >
                <div className="provider-register__section-header">
                  <div>
                    <span className="provider-register__section-kicker">
                      Step 2
                    </span>
                    <h2
                      id="professional-profile-title"
                      className="provider-register__section-title"
                    >
                      Professional profile
                    </h2>
                    <p className="provider-register__section-description">
                      Add the services you provide, your qualifications, and
                      your professional background.
                    </p>
                  </div>
                </div>

                <div className="provider-register__professional-block">
                  <div className="provider-register__block-header">
                    <div>
                      <h3 className="provider-register__block-title">
                        Services & specializations
                      </h3>
                      <p className="provider-register__block-description">
                        You can add up to 5 services and as many specializations
                        as you need.
                      </p>
                    </div>

                    <span className="provider-register__service-counter">
                      {selectedServices.length}/5
                    </span>
                  </div>

                  <div className="provider-register__services">
                    {selectedServices.map((selectedService, serviceIndex) => {
                      const selectedServiceData = SERVICE_OPTIONS.find(
                        (item) => item.name === selectedService.service,
                      );

                      const availableServices =
                        getAvailableServices(serviceIndex);

                      return (
                        <div
                          key={`service-${serviceIndex}`}
                          className="provider-register__service-card"
                        >
                          <div className="provider-register__service-card-header">
                            <div>
                              <span className="provider-register__service-number">
                                Service {serviceIndex + 1}
                              </span>
                            </div>

                            {selectedServices.length > 1 && (
                              <button
                                type="button"
                                className="provider-register__remove-button"
                                onClick={() => removeService(serviceIndex)}
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="provider-register__grid">
                            <div className="provider-register__field provider-register__field--full">
                              <label className="provider-register__label">
                                Select a service *
                              </label>

                              <select
                                className="provider-register__select"
                                value={selectedService.service}
                                onChange={(e) => {
                                  updateService(serviceIndex, {
                                    service: e.target.value,
                                    customService: "",
                                    specializations: [],
                                    customSpecializations: [],
                                  });
                                }}
                              >
                                <option value="">Select a service</option>

                                {availableServices.map((service) => (
                                  <option
                                    key={service.name}
                                    value={service.name}
                                  >
                                    {service.name}
                                  </option>
                                ))}

                                <option value="Other">Other</option>
                              </select>

                              {errors[`service-${serviceIndex}`] && (
                                <span className="provider-register__error">
                                  {errors[`service-${serviceIndex}`]}
                                </span>
                              )}
                            </div>

                            {selectedService.service === "Other" && (
                              <div className="provider-register__field provider-register__field--full">
                                <label className="provider-register__label">
                                  Specify your service *
                                </label>
                                <input
                                  className="provider-register__input"
                                  type="text"
                                  value={selectedService.customService}
                                  onChange={(e) =>
                                    updateService(serviceIndex, {
                                      customService: e.target.value,
                                    })
                                  }
                                  placeholder="Enter your service or profession"
                                />
                              </div>
                            )}
                          </div>

                          {selectedServiceData && (
                            <div className="provider-register__specialization-section">
                              <div className="provider-register__specialization-header">
                                <div>
                                  <span className="provider-register__section-kicker">
                                    Specializations
                                  </span>
                                  <h4 className="provider-register__specialization-title">
                                    Areas of specialization
                                  </h4>
                                </div>

                                <button
                                  type="button"
                                  className="provider-register__secondary-button"
                                  onClick={() =>
                                    addSpecialization(serviceIndex)
                                  }
                                >
                                  + Add specialization
                                </button>
                              </div>

                              {selectedService.specializations.length === 0 && (
                                <div className="provider-register__empty-state">
                                  Select at least one area of specialization.
                                </div>
                              )}

                              <div className="provider-register__specialization-list">
                                {selectedService.specializations.map(
                                  (specialization, specializationIndex) => (
                                    <div
                                      className="provider-register__specialization-row"
                                      key={`specialization-${serviceIndex}-${specializationIndex}`}
                                    >
                                      <select
                                        className="provider-register__select"
                                        value={specialization}
                                        onChange={(e) => {
                                          const value = e.target.value;

                                          if (value === "Other") {
                                            updateSpecialization(
                                              serviceIndex,
                                              specializationIndex,
                                              "Other",
                                            );

                                            addCustomSpecialization(
                                              serviceIndex,
                                            );
                                          } else {
                                            updateSpecialization(
                                              serviceIndex,
                                              specializationIndex,
                                              value,
                                            );
                                          }
                                        }}
                                      >
                                        <option value="">
                                          Select area of specialization
                                        </option>

                                        {selectedServiceData.specializations
                                          .filter(
                                            (option) =>
                                              !selectedService.specializations.includes(
                                                option,
                                              ) || option === specialization,
                                          )
                                          .map((option) => (
                                            <option key={option} value={option}>
                                              {option}
                                            </option>
                                          ))}

                                        <option value="Other">Other</option>
                                      </select>

                                      <button
                                        type="button"
                                        className="provider-register__remove-button"
                                        onClick={() =>
                                          removeSpecialization(
                                            serviceIndex,
                                            specializationIndex,
                                          )
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>

                              {selectedService.customSpecializations.map(
                                (customValue, customIndex) => (
                                  <div
                                    className="provider-register__custom-specialization"
                                    key={`custom-specialization-${serviceIndex}-${customIndex}`}
                                  >
                                    <input
                                      className="provider-register__input"
                                      type="text"
                                      value={customValue}
                                      onChange={(e) =>
                                        updateCustomSpecialization(
                                          serviceIndex,
                                          customIndex,
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Specify your area of specialization"
                                    />

                                    <button
                                      type="button"
                                      className="provider-register__remove-button"
                                      onClick={() =>
                                        removeCustomSpecialization(
                                          serviceIndex,
                                          customIndex,
                                        )
                                      }
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ),
                              )}

                              <button
                                type="button"
                                className="provider-register__other-specialization-button"
                                onClick={() =>
                                  addCustomSpecialization(serviceIndex)
                                }
                              >
                                + I can&apos;t find my specialization
                              </button>

                              {errors[`specialization-${serviceIndex}`] && (
                                <span className="provider-register__error">
                                  {errors[`specialization-${serviceIndex}`]}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="provider-register__add-service"
                    onClick={addService}
                    disabled={selectedServices.length >= 5}
                  >
                    {selectedServices.length >= 5
                      ? "Maximum of 5 services reached"
                      : "+ Add another service"}
                  </button>
                </div>

                <div className="provider-register__professional-block">
                  <div className="provider-register__block-header">
                    <div>
                      <h3 className="provider-register__block-title">
                        Educational background
                      </h3>
                      <p className="provider-register__block-description">
                        Tell us about your highest level of education and
                        professional training.
                      </p>
                    </div>
                  </div>

                  <div className="provider-register__grid">
                    <div className="provider-register__field">
                      <label className="provider-register__label">
                        Highest level of education *
                      </label>
                      <select
                        className="provider-register__select"
                        value={formData.highestEducation}
                        onChange={(e) =>
                          updateField("highestEducation", e.target.value)
                        }
                      >
                        <option value="">Select education level</option>
                        <option value="none">No Formal Education</option>
                        <option value="highschool">High School</option>
                        <option value="associate">
                          Associate&apos;s Degree
                        </option>
                        <option value="bachelor">Bachelor&apos;s Degree</option>
                        <option value="master">Master&apos;s Degree</option>
                        <option value="doctorate">Doctorate</option>
                        <option value="other">Other</option>
                      </select>

                      {errors.highestEducation && (
                        <span className="provider-register__error">
                          {errors.highestEducation}
                        </span>
                      )}
                    </div>

                    <div className="provider-register__field">
                      <label className="provider-register__label">
                        Field of study
                      </label>
                      <input
                        className="provider-register__input"
                        type="text"
                        value={formData.fieldOfStudy}
                        onChange={(e) =>
                          updateField("fieldOfStudy", e.target.value)
                        }
                        placeholder="e.g. Computer Science"
                      />
                      {errors.fieldOfStudy && (
                        <span className="provider-register__error">
                          {errors.fieldOfStudy}
                        </span>
                      )}
                    </div>

                    <div className="provider-register__field provider-register__field--full">
                      <label className="provider-register__label">
                        Educational document
                      </label>
                      <input
                        className="provider-register__file"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange("educationDocument")}
                      />
                    </div>
                  </div>
                </div>

                <div className="provider-register__professional-block">
                  <div className="provider-register__block-header">
                    <div>
                      <h3 className="provider-register__block-title">
                        Licensing
                      </h3>
                      <p className="provider-register__block-description">
                        Provide licensing information where your profession
                        requires it.
                      </p>
                    </div>
                  </div>

                  <div className="provider-register__grid">
                    <div className="provider-register__field">
                      <label className="provider-register__label">
                        Are you licensed to work in this field? *
                      </label>
                      <select
                        className="provider-register__select"
                        value={formData.isLicensed}
                        onChange={(e) =>
                          updateField("isLicensed", e.target.value)
                        }
                      >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>

                      {errors.isLicensed && (
                        <span className="provider-register__error">
                          {errors.isLicensed}
                        </span>
                      )}
                    </div>

                    {formData.isLicensed === "yes" && (
                      <>
                        <div className="provider-register__field">
                          <label className="provider-register__label">
                            License name
                          </label>
                          <input
                            className="provider-register__input"
                            type="text"
                            value={formData.licenseName}
                            onChange={(e) =>
                              updateField("licenseName", e.target.value)
                            }
                            placeholder="Enter license title"
                          />
                          {errors.licenseName && (
                            <span className="provider-register__error">
                              {errors.licenseName}
                            </span>
                          )}
                        </div>

                        <div className="provider-register__field provider-register__field--full">
                          <label className="provider-register__label">
                            Upload license document
                          </label>
                          <input
                            className="provider-register__file"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleFileChange("licenseDocument")}
                          />
                          {errors.licenseDocument && (
                            <span className="provider-register__error">
                              {errors.licenseDocument}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="provider-register__professional-block">
                  <div className="provider-register__block-header">
                    <div>
                      <h3 className="provider-register__block-title">
                        About your services
                      </h3>
                      <p className="provider-register__block-description">
                        Give clients a short introduction to what you offer.
                      </p>
                    </div>
                  </div>

                  <div className="provider-register__field">
                    <label className="provider-register__label">
                      Brief service description *
                    </label>

                    <textarea
                      className="provider-register__textarea"
                      value={formData.serviceDescription}
                      onChange={(e) =>
                        updateField(
                          "serviceDescription",
                          e.target.value.slice(0, 300),
                        )
                      }
                      placeholder="Describe the services you provide, your experience, and what clients can expect."
                      rows={6}
                    />

                    <div className="provider-register__character-count">
                      {formData.serviceDescription.length}/300
                    </div>

                    {errors.serviceDescription && (
                      <span className="provider-register__error">
                        {errors.serviceDescription}
                      </span>
                    )}
                  </div>
                </div>
              </section>
            )}

            <div className="provider-register__actions">
              {currentStep === 2 && (
                <button
                  type="button"
                  className="provider-register__back-button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}

              {currentStep === 1 ? (
                <button
                  type="button"
                  className="provider-register__next-button"
                  onClick={handleNext}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="provider-register__submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Creating your profile..."
                    : "Complete Registration"}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
