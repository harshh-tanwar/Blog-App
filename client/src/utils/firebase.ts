import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import config from "../config/config";

const firebaseConfig = config.firebase;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
