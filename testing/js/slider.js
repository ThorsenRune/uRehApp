let app = (() => {
// My Hacks
	function getValue(n){
		return  this.inputs[n].value;
	}
	function setValue(n,value){
		this.inputs[n].value=value;
		updateSlider(this.inputs[n])
		return value;
	}
// End my hacks
  function updateSlider(element) {
    if (element) {
      let parent = element.parentElement,
      lastValue = parent.getAttribute('data-slider-value');

      if (lastValue === element.value) {
        return; // No value change, no need to update then
      }

      parent.setAttribute('data-slider-value', element.value);
      let $thumb = parent.querySelector('.range-slider__thumb'),
      $bar = parent.querySelector('.range-slider__bar'),
      pct = element.value * ((parent.clientHeight - $thumb.clientHeight) / parent.clientHeight);

      $thumb.style.bottom = `${pct}%`;
      $bar.style.height = `calc(${pct}% + ${$thumb.clientHeight / 2}px)`;
      $thumb.textContent = `${element.value}%`;
    }
  }
  return {			//Export the variables
    updateSlider: updateSlider 
    ,getValue: getValue  
	,setValue:setValue
	};


})();

(function initAndSetupTheSliders() {
  const inputs = [].slice.call(document.querySelectorAll('.range-slider input'));
  app.inputs=inputs;
  inputs.forEach(input => input.setAttribute('value', '50'));
  inputs.forEach(input => app.updateSlider(input));
  // Cross-browser support where value changes instantly as you drag the handle, therefore two event types.
  inputs.forEach(input => input.addEventListener('input', element => app.updateSlider(input)));
  inputs.forEach(input => input.addEventListener('change', element => app.updateSlider(input)));
})();