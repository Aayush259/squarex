
export const Loader = () => {

    return (
        <div className="flex flex-row items-center justify-center mx-auto w-fit">
            {
                ['animate-loading1', 'animate-loading2', 'animate-loading3'].map(animation => (
                    <div
                        key={animation}
                        className={`w-3 h-3 m-1 rounded-full bg-white opacity-0 ${animation}`}
                    />
                ))
            }
        </div>
    );
};

export const CreatingPortfolioSpinner = () => {

    return (
        <div className="fixed w-screen h-screen top-0 left-0 z-[100] bg-black/90 flex items-center justify-center">
            <div>
                <Loader />
                <p className="text-white text-lg text-center mt-8">
                    {"Setting up your portfolio..."}
                </p>
                <p className="text-white text-lg text-center mt-3">
                    {"Please don't close this tab or refresh the page."}
                </p>
            </div>
        </div>
    );
};

export const FullPageLoader = () => {

    return (
        <div className="fixed w-screen h-screen top-0 left-0 z-[100] bg-black/90 flex items-center justify-center">
            <Loader />
        </div>
    )
};
