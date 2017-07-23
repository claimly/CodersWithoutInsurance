(function (global) {
	
	function buyInsuranceUser() {
		return true;
	}

	function getRainProbability() {
		var rainProbability = 0.2;
		// connect to weather api
		return rainProbability;
	}

	function updateConvertedValue(ether) {
		var priceEther = parseFloat(ether) + parseFloat(ether) * getRainProbability();

		$('.js-input-number-user-inflated').val(priceEther);
	}

	function populateDate() {
		if ($('.js-input-date').length) {
			$('.js-input-date').val('26th of July');
		}
	}
	
	function populateShareLink() {
		if ($('.js-share-link').length) {
			var path = window.location.href;
			var realPath;
			var pathParts = path.split('/');

			if (pathParts.length > 1) {
				realPath = '';

				for(var i = 0 ; i < pathParts.length - 1 ; i++) {
					realPath += pathParts[i] + '/';
				}

				realPath += 'UserContractPage';
			} else {
				realPath = path + 'UserContractPage';
			}

			$('.js-share-link')
				.attr('href', realPath)
				.text(realPath);
		}
	}

	$('.js-go-to-events').submit(function () {
		var path = window.location.href;
		var realPath;

		if (path.split('?').length > 1) {
			realPath = path.split('?')[0];
		} else {
			realPath = path;
		}

		window.location.href = path + 'ViewEventsPage';
	});

	$('.js-submit-organize-form').click(function (e) {
		e.preventDefault();
		var nextStep = false;
		var createContract = false;
		// get form info

		var name = $('.js-input-name').val();
		var location = $('.js-input-location').val();
		var number = $('.js-input-number').val(); 
		var date = $('.js-input-date').val(); // convert to timestamp (only needed)

		if (name && location && number && date) {
			nextStep = true;
		}

		// create contract

		// create link (optional)

		if (nextStep) {
			window.location.href = window.location.href + 'EventConfirmationPage';
		}
	});

	$('.js-input-number-user').bind('keyup', function () {
		updateConvertedValue($(this).val());
	});

	$('.js-submit-button-buy-insurance').click(function () {
		var nextStep = buyInsuranceUser();

		if (nextStep) {
			var path = window.location.href;
			var realPath;
			var pathParts = path.split('/');

			if (pathParts.length > 1) {
				realPath = '';

				for(var i = 0 ; i < pathParts.length - 1 ; i++) {
					realPath += pathParts[i] + '/';
				}

				realPath += 'UserConfirmationPage';
			} else {
				realPath = path + 'UserConfirmationPage';
			}

			window.location.href = realPath;
		}
	});

	populateDate();
	populateShareLink();
	if ($('.js-input-number-user').length) {
		updateConvertedValue($('.js-input-number-user').val());
	}

	if (typeof web3 !== 'undefined') {
		// contract stuff
		global.abi = global.compiledContract.interface;
		global.bytecode = '0x' + global.compiledContract.bytecode;
		if (web3) {
			global.gasEstimate = web3.eth.estimateGas({data: global.bytecode});
			global.Contract = web3.eth.contract(JSON.parse(global.abi));
		}
	}

}(window));
