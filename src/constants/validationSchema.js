
import * as yup from "yup";


const videoRequiredTest = function (value, context) {
    const videoFiles = context.parent.video || [];
    const videoList = context.parent.videoList || [];
    return (videoFiles?.length || 0) > 0 || (videoList?.length || 0) > 0;
};


export const pdfBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    pdf: yup
        .array()
        .min(1, "At least one PDF must be uploaded")
        .required("PDF is required"),

    // Dynamic PDFs (optional but structured)
    pdfs: yup.array().of(
        yup.object().shape({
            name: yup.string().nullable(),
            description: yup.string().nullable(),
            image: yup.array().nullable(),
        })
    ),

    // Required fields
    company: yup.string().required("Company is required"),
    pdfTitle: yup.string().required("PDF Title is required"),
    description: yup.string().required("Description is required"),

    // // Optional fields
    // website: yup.string().url("Enter a valid URL").nullable(),

    // pdfBanner: yup.array().nullable(),

    // btnTxt: yup.string().when("$selectedTemplate", {
    //     is: 0,
    //     then: (schema) => schema.required("Button text is required"),
    //     otherwise: (schema) => schema.nullable(),
    // }),
});

export const imageBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    images: yup
        .array()
        .min(1, "At least one image must be uploaded")
        .required("PDF is required"),

    // Required fields
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),

});


export const videoBuilderSchema = yup.object().shape({

    video: yup
        .array()
        .min(1, "At least one image must be uploaded")
        .required("At least one video must be uploaded"),

});


export const appBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    image: yup
        .array()
        // .min(1, "At least one image must be uploaded")
        .required("App Logo is required"),

    // Required fields
    appName: yup.string().required("App name is required"),
    developer: yup.string().required("Developer/Company name is required"),

});

export const couponBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    image: yup
        .array()
        // .min(1, "At least one image must be uploaded")
        .required("Image is required"),

    // Required fields
    companyName: yup.string().required("Company name is required"),
    title: yup.string().required("Title is required"),
    salesBadge: yup.string().required("Sales Badge is required"),
    couponCode: yup.string().required("Coupon Code is required"),
    validUntil: yup.string().required("Validity is required"),
});

export const vcardPlusBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    profileImg: yup
        .array()
        // .min(1, "At least one image must be uploaded")
        .required("Profile is required"),

    // Required fields
    name: yup.string().required("First Name is required"),
    title: yup.string().required("Title is required"),

});

export const socialMediaBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    image: yup
        .array()
        // .min(1, "At least one image must be uploaded")
        .required("Image is required"),

    // Required fields
    description: yup.string().required("Description is required"),
    title: yup.string().required("Title is required"),

});

export const businessBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    image: yup
        .array()
        // .min(1, "At least one image must be uploaded")
        .required("Image is required"),

    // Required fields
    company: yup.string().required("Company is required"),
    title: yup.string().required("Title is required"),


    subtitle: yup.string().required("Subtitle is required"),

});


export const listOfLinksBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    logo: yup
        .array()
        // .min(1, "At least one image must be uploaded")
        .required("Image is required"),

    // Required fields
    // company: yup.string().required("Company is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),

});

export const eventBuilderFormSchema = yup.object().shape({
    // At least one PDF required
    image: yup
        .array()
        // .min(1, "At least one image must be uploaded")
        .required("Image is required"),

    // Required fields
    // company: yup.string().required("Company is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),

});

export const textBuilderFormSchema = yup.object().shape({

    message: yup.string().required("Message is required"),

});


export const urlBuilderFormSchema = yup.object().shape({

    url: yup.string().required("Url is required"),

});

export const whatsAppBuilderFormSchewma = yup.object().shape({

    number: yup.string().length(10, "Number must be 10 characters long")
        .required("Number is required"),
    message: yup.string().required("Message is required")

});

export const wifiBuilderFormSchewma = yup.object().shape({

    // networkName: yup.string().length(10, "Number must be 10 characters long")
    //     .required("Number is required"),
    networkName: yup.string().required("Network Name is required")

});


export const smsBuilderFormSchewma = yup.object().shape({

    number: yup.string().length(10, "Number must be 10 characters long")
        .required("Number is required"),
    message: yup.string().required("Message Name is required")

});



export const normalVCardBuilderFormSchewma = yup.object().shape({


    fullName: yup.string().required("Full Name is required")

});