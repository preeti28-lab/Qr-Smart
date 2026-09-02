// components/qr/previewRegistry.js

import AppPreviewScreen from "../../pages/appBuilder/AppPreviewScreen";
import UrlPreviewScreen from "../../pages/urlBuilder/UrlPreviewScreen";
import PdfPreviewScreen from "../../pages/pdfBuilder/PdfPreviewScreen";

export const previewRegistry = {
  app: AppPreviewScreen,
  url: UrlPreviewScreen,
  pdf: PdfPreviewScreen,
};