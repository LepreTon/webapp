import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  return (
    <div class="fixed inset-x-0 bottom-0 bg-main2-green shadow-lg border-t-2 border-yellow-400 bg-main-color select-none">
    <div class="flex justify-center items-center">
        <div class="flex-1 group">
            <NavLink to="/" class=" text-center px-4 pt-2 w-full group-hover:text-white">
                <span class="flex flex-col justify-center items-center px-1 pt-1 pb-1">
                    <i class="fa-solid fa-clover text-2xl"></i>
                    <span class="text-xs pb-2">Mining</span>
                    <span class="w-5 mx-auto h-1 group-hover:bg-white rounded-full"></span>
                </span>
            </NavLink>
        </div>
        <div class="flex-1 group">
            <NavLink to="/statistic" class="text-center mx-auto px-4 pt-3 w-full group-hover:text-white">
                <span class="flex flex-col justify-center items-center px-1 pt-1 pb-1">
                    <i class="fa-solid fa-chart-simple text-2xl"></i>
                    <span class="text-xs pb-2">Statistic</span>
                    <span class="w-5 mx-auto h-1 group-hover:bg-white rounded-full"></span>
                </span>
            </NavLink>
        </div>
        <div class="flex-1 group">
            <NavLink to="/referral" class="text-center mx-auto px-4 pt-2 w-full group-hover:text-white">
                <span class="flex flex-col justify-center items-center px-1 pt-1 pb-1">
                    <i class="fa-solid fa-user-group text-2xl"></i>
                    <span class="text-xs pb-2">Frens</span>
                    <span class="w-5 mx-auto h-1 group-hover:bg-white rounded-full"></span>
                </span>
            </NavLink>
        </div>
    </div>
</div>
  );
};

export default Navigation;