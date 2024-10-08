import { useState, useEffect } from "react";
import CalcLayout from "../CalcLayout";
import IncreaseCard from "../IncreaseCard";
import BMIResult from "./Result";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Loading from "../Loading";

export default function BMICalculator({ HideResult, Result }) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(165);
  const [bmi, setBmi] = useState(33.3);
  const [message, setMessage] = useState("");
  const [ShowResult, setShowResult] = useState(Result);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setShowResult(Result);
  }, [Result]);

  const calculateBMI = () => {
    setloading(true);
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
  
      setTimeout(() => {
        setBmi(bmiValue);
  
        if (bmiValue < 18.5) {
          setMessage(t("Underweight")); // ترجمة الحالة
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
          setMessage(t("Normal weight")); // ترجمة الحالة
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
          setMessage(t("Overweight")); // ترجمة الحالة
        } else {
          setMessage(t("Obesity")); // ترجمة الحالة
        }
  
        HideResult(true);
        setloading(false); // تحريك setloading إلى هنا لضمان أنه ينفذ بعد انتهاء العمليات
      }, 3000);
    }
  };
  

  return (
    <CalcLayout Title={t("BMI Calculator")}>
      <Helmet>
        <title>Clinic-Square || BMI-Calc </title>
        <meta name="description" content="وصف مخصص لصفحة معينة" />
        <meta name="keywords" content="كلمات, مفتاحية, هنا" />
      </Helmet>
      <br/>
      <div className="w-[90%] max-sm:w-[70%] max-w-[400px] m-auto p-5 rounded-md  flex flex-col items-center">
        {ShowResult && bmi ? (
          <BMIResult
            BMI={bmi}
            Message={t(message)}
            Weight={weight}
            Height={height}
          />
        ) : (
          <div>
            <div className="flex gap-6 max-md:flex max-sm:flex-col justify-center">
              <IncreaseCard
                Title={t("Weight")} // ترجمة "Weight"
                DefaultV={weight}
                Value={setWeight}
              />
              <IncreaseCard
                Title={t("Height")} // ترجمة "Height"
                DefaultV={height}
                Value={setHeight}
              />
            </div>

            <button
              onClick={calculateBMI}
              className="
              transition
              w-full m-auto ring-[#00ACA8] ring-1 bg-white text-[#00ACA8] p-2 rounded mt-2
              hover:text-white   hover:bg-[#00ACA8]
              "
            >
              {t("Calculate BMI")} {/* ترجمة زر "Calculate BMI" */}
            </button>
          </div>
        )}
      <br/>

        {loading && <Loading/>}
      </div>
    </CalcLayout>
  );
}
