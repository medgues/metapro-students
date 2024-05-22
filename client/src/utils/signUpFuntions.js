import {
  EmailAuthProvider,
  RecaptchaVerifier,
  linkWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import {
  coursesList,
  userState,
  schedulesList,
} from "../store/slices/globaleStateSlice";
import { serializeDate } from "../utils/utils";
import store from "../store/store";

export const setUpRecaptcha = async (phoneNumber, email) => {
  const emailCheck = await getDocs(
    query(collection(db, "users"), where("email", "==", email))
  );

  if (!emailCheck.empty) {
    // eslint-disable-next-line no-throw-literal
    throw { code: "auth/email-already-in-use" };
  } else {
    const phoneCheck = await getDocs(
      query(collection(db, "users"), where("phoneNumber", "==", phoneNumber))
    );
    if (!phoneCheck.empty) {
      // eslint-disable-next-line no-throw-literal
      throw { code: "auth/phone-already-in-use" };
    } else {
      const recaptchaVerify = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
      });
      return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerify);
    }
  }
};

export const signUp = async (otp, confirmObj, email, password) => {
  await confirmObj.confirm(otp).then(async (result) => {
    const { emailVerified, uid, phoneNumber, photoURL } = result.user;
    await setDoc(doc(db, "users", uid), {
      email,
      emailVerified,
      phoneNumber,
      photoURL,
    });
    const credential = EmailAuthProvider.credential(email, password);
    linkWithCredential(auth.currentUser, credential);
  });
};

export const verifyEmail = async () => {
  sendEmailVerification(auth.currentUser);
};

export const logIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  store.dispatch(userState({}));
  return auth.signOut();
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const getUser = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      createdAt: serializeDate(docSnap.data().createdAt),
    };
  }
};
export const updateUser = async (userID, values) => {
  await setDoc(
    doc(db, "users", userID),
    { ...values },
    {
      merge: true,
    }
  );
};

export const getCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));

  const courses = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    courses.push({
      id: doc.id,
      courseName: docData.label.en ? docData.label.en : docData.name,
    });
  });
  store.dispatch(coursesList(courses));
};

export const getSchedule = async () => {
  const querySnapshot = await getDocs(collection(db, "schedules"));

  const schedules = [];

  querySnapshot.forEach((doc) => {
    let sched = ``;
    Object.keys(doc.data()).forEach(
      (key) => (sched += `${key} ${doc.data()[key].start} | `)
    );

    schedules.push({
      id: doc.id,
      schedule: sched,
    });
  });
  store.dispatch(schedulesList(schedules));
};
