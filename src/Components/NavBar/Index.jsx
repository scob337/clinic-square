import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/Clinic3-removebg-preview.png";
import { useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Index({ Lang, Active }) {
	const [Toggle, setToggle] = useState(false);
	const [activeItem, setActiveItem] = useState("");
	// استخدم useLocation لتتبع مسار الصفحة الحالي
	const location = useLocation();
	const { t } = useTranslation();
	useEffect(() => {
		setActiveItem(location.pathname); // يحدث عند تغيير المسار
	}, [location]);

	const HandleToggle = () => {
		setToggle(!Toggle);
		console.log(Toggle);
	};
	const ChangeLang = (Langu) => {
		Lang(Langu);
	};
	useEffect(() => {
		window.onresize = () => {
			setToggle(false); // إخفاء القائمة عند تغيير حجم النافذة
		};
	}, []);

	const Data = [
		{ id: 1, name: "Home", link: "/" },
		{ id: 2, name: "Services", link: "/services" },
		{ id: 3, name: "Doctors", link: "/doctors" },
		{ id: 4, name: "Activity", link: "/activity" },
		{ id: 5, name: "Labs & Pharmacy", link: "#4" },
	];

	return (
		<nav className="flex justify-evenly w-[100%] p-3 h-[145px] bg-white items-center max-md:relative">
			<div className="logo w-[200px]">
				<img
					src={Logo}
					alt="Logo"
					loading="lazy"
					className="w-[200px] h-[110px] object-cover"
				/>
			</div>
			<ul
				className={`max-md:absolute 
                                    lg:relative items-center justify-center gap-4 1/3 
                                    md:flex
                                    max-md:flex-col max-md:items-start max-md:pl-2 
                                    max-md:p-2
                                    max-md:top-[130px] max-md:left-0 
                                    overflow-hidden transition-all duration-300
                                    max-md:${
																			Toggle
																				? "max-h-[600px]"
																				: "max-h-[0px] hidden"
																		} 
                                    max-md:z-50 max-md:bg-white hover:text-[#00ACA8]
                                    lg:flex
                                `}
			>
				{Data.map((item) => (
					<NavLink
						end
						to={item.link}
						key={item.id}
						className={`
                                            cursor-pointer hover:text-[#00ACA8] transition-all duration-200
                                            font-[600]
                                            group
                                            max-md:p-1 max-md:w-[150px]
                                            ${
																							activeItem === item.link
																								? "text-[#00ACA8]"
																								: "text-gray-600"
																						}
                                        `}
					>
						<li>{t(item.name)}</li>
					</NavLink>
				))}
			</ul>
			<div className="p-3 flex gap-2" dir="ltr">
				<button
					onClick={() => ChangeLang("en")}
					className={`font-semibold hover:text-[#00ACA8] transition ${
						Active === "en" ? "text-[#00ACA8]" : ""
					}  `}
				>
					{" "}
					Eng{" "}
				</button>
				|
				<button
					onClick={() => ChangeLang("ar")}
					className={`font-semibold hover:text-[#00ACA8] transition ${
						Active === "ar" ? "text-[#00ACA8]" : ""
					}`}
				>
					{" "}
					AR{" "}
				</button>
			</div>
			<div className="cursor-pointer md:hidden">
				<FaBarsStaggered size={36} onClick={HandleToggle} />
			</div>
		</nav>
	);
}
