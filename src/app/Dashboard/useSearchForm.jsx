"use client"

function useSearchForm() {

  const HandleSearch = () => {
    useEffect(() => {
      if (typeof window !== "undefined" && document) {
        const stateSelect = document.querySelector("#sel1");
        const typeSelect = document.querySelector("#sel2");
        const categorySelect = document.querySelector("#sel3");
        const investmentSelect = document.querySelector("#sel4");
        const stateValue = stateSelect.value;
        const typeValue = typeSelect.value;
        const categoryValue = categorySelect.value;
        const investmentValue = investmentSelect.value;
        
        const newURL = new URL(window.location.href);
        newURL.searchParams.set('s', stateValue);
        newURL.searchParams.set('c', typeValue);
        newURL.searchParams.set('t', categoryValue);
        newURL.searchParams.set('v', investmentValue);
        window.history.pushState({ path: newURL.href }, '', newURL.href);
        //window.location.href = `?s=${stateValue}&c=${typeValue}&t=${categoryValue}&v=${investmentValue}`;
      }
    }, []);
  };

  return HandleSearch;
}
export default useSearchForm;