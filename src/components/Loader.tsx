
export const CreatingPortfolioSpinner = () => {

    return (
        <div className="fixed w-screen h-screen top-0 left-0 z-[100] bg-black/90 flex items-center justify-center">
            <div>
                <div className="animate-spin rounded-full h-12 w-12 mx-auto border-t-2 border-b-2 border-white" />
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
