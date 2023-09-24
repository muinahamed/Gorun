/**
 * Global form validation Functions
 */

class FormValidation {
  static validate(key, formData) {
    var result;
    switch (key) {
      case 'email':
        result = this.emailValidate(formData);
        break;

      case 'shop':
        result = this.shopValidate(formData);
        break;
      case 'profileImageUrl':
        result = this.profileImageUrlValidate(formData);
        break;
      case 'nationalIdURL':
        result = this.nationalIdURLValidate(formData);
        break;
      case 'vehicleDocumentURL':
        result = this.vehicleDocumentValidate(formData);
        break;
      case 'contractImageURL':
        result = this.contractImageValidate(formData);
        break;
      case 'password':
        result = this.passwordValidate(formData);
        break;
      case 'rePassword':
        result = this.matchPasswordValidate(formData);
        break;
      case 'firstName':
        result = this.nameValidate(formData);
        break;
      case 'ownerName':
        result = this.ownerNameValidate(formData);
        break;
      case 'lastName':
        result = this.lastNameValidate(formData);
        break;
      case 'phoneNumber':
        result = this.phoneNumberValidate(formData);
        break;
      case 'gender':
        result = this.genderValidate(formData);
        break;
      case 'dob':
        result = this.dobValidate(formData);
        break;
      case 'street':
        result = this.streetValidate(formData);
        break;
      case 'city':
        result = this.cityValidate(formData);
        break;
      case 'postCode':
        result = this.pinCodeValidate(formData);
        break;
      case 'state':
        result = this.stateValidate(formData);
        break;
      case 'country':
        result = this.countryValidate(formData);
        break;
      case 'mobile':
        result = this.mobilevalidate(formData);
      case 'nickName':
        result = this.nickName(formData);
        break;
      case 'address':
        result = this.address(formData);
        break;

      case 'nid':
        result = this.nid(formData);
        break;

      case 'passport':
        result = this.passport(formData);
        break;

      case 'trade':
        result = this.trade(formData);
        break;

      case 'shopTypeID':
        result = this.shopTypeID(formData);
        break;

      case 'productName':
        result = this.productName(formData);
        break;
      case 'price':
        result = this.price(formData);
        break;
      case 'unit':
        result = this.unit(formData);
        break;
      case 'quantity':
        result = this.quantity(formData);
        break;
      case 'des':
        result = this.des(formData);
        break;
      case 'category':
        result = this.category(formData);
        break;
      case 'title':
        result = this.title(formData);
        break;
      default:
        break;
    }
    return result;
  }

  static VN = formData => {
    let name = formData;

    if (name?.length === 0) {
      return 'Enter a Valid vehicle number';
    } else {
      return '';
    }
  };

  static VT = formData => {
    let name = formData;

    if (name?.length === 0) {
      return 'Enter a Valid vehicle number';
    } else {
      return '';
    }
  };

  static monthYear = formData => {
    let name = formData;
    var d = new Date();
    var year = d.getFullYear();
    year = year.toString().substr(-2);

    if (
      name[0] != null &&
      name[0] !== '' &&
      name[0] !== undefined &&
      name[1] != null &&
      name[1] !== '' &&
      name[1] !== undefined &&
      name[1].length === 2
    ) {
      if (
        !name[0].match('(0[1-9]|1[012])' || parseInt(year) > parseInt(name[1]))
      ) {
        return 'Your Expire date must be a valid.';
      }
    } else {
      return 'We need your Expiry Date to continue.';
    }
    return '';
  };

  static cardName = formData => {
    let name = formData;

    if (name != null && name !== '' && name !== undefined) {
      if (name.length > 50) {
        return 'Your card name should be less than 50 characters.';
      } else if (!name.match('^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$')) {
        return 'We need your card name to continue.';
      }
    } else {
      return 'We need your card name to continue.';
    }
    return '';
  };

  static CVV = formData => {
    let CVV = formData;
    if (CVV != null && CVV !== '' && CVV !== undefined) {
      var filter = /^[0-9]{3,4}$/;
      const result = CVV.match(filter);
      if (result) {
        return '';
      } else {
        return 'You have entered an invalid CVV.';
      }
    } else {
      return 'We need your CVV to continue.';
    }
  };

  static cardNumber = formData => {
    let cardNumber = formData;
    if (cardNumber != null && cardNumber !== '' && cardNumber !== undefined) {
      var filter =
        /^(3[47][0-9]{13}|(6541|6556)[0-9]{12}|389[0-9]{11}|3(?:0[0-5]|[68][0-9])[0-9]{11}|65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})|63[7-9][0-9]{13}|(?:2131|1800|35\d{3})\d{11}|9[0-9]{15}|(6304|6706|6709|6771)[0-9]{12,15}|(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}|(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))|(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}|(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}|(62[0-9]{14,17})|4[0-9]{12}(?:[0-9]{3})?|(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}))$/gm;
      const result = cardNumber.match(filter);
      if (result) {
        return '';
      } else {
        return 'You have entered an invalid Card number .';
      }
    } else {
      return 'We need your Card number to continue.';
    }
  };

  static genderValidate = formData => {
    let gender = formData != null ? formData.trim() : '';

    if (gender.length === 0) {
      return 'We need your gender to continue.';
    }

    return '';
  };

  static genderValidate = formData => {
    let gender = formData != null ? formData.trim() : '';

    if (gender.length === 0) {
      return 'We need your gender to continue.';
    }

    return '';
  };

  static dobValidate = formData => {
    let dob = formData != null ? formData : '';

    if (dob.length === 0) {
      return 'We need your date of birth to continue.';
    }

    return '';
  };

  static nameValidate = formData => {
    let name = formData != null ? formData.trim() : '';

    if (name != null && name !== '' && name !== undefined) {
      if (name.length > 50) {
        return 'Your name should be less than 50 characters.';
      } else if (!name.match('^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$')) {
        return 'We need a valid name to continue.';
      }
    } else {
      return 'We need your name to continue.';
    }
    return '';
  };

  static ownerNameValidate = formData => {
    let name = formData != null ? formData.trim() : '';

    if (name != null && name !== '' && name !== undefined) {
      if (name.length > 50) {
        return 'Owner name should be less than 50 characters.';
      } else if (!name.match('^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$')) {
        return 'We need a valid owner name to continue.';
      }
    } else {
      return 'We need owner name to continue.';
    }
    return '';
  };

  static emailValidate(formData) {
    var filter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var email = formData != null ? formData : '';

    if (email !== '' && email != null) {
      if (filter.test(email)) {
        return '';
      } else {
        return 'You have entered an invalid Email ID.';
      }
    } else {
      return 'We need your Email ID to continue.';
    }
  }

  static shopValidate(formData) {
    if (formData !== '' && formData != null) {
      return '';
    } else {
      return 'We need Shop Name to continue.';
    }
  }
  static vehicleNumberValidate(formData) {
    if (formData !== '' && formData != null) {
      return '';
    } else {
      return 'We need your vehicle number to continue.';
    }
  }
  static vehicleTypeValidate(formData) {
    var email = formData != null ? formData : '';
    if (email !== '' && email != null) {
      return '';
    } else {
      return 'We need your vehicle type to continue.';
    }
  }
  static profileImageUrlValidate(formData) {
    var profileImageUrl = formData != null ? formData : '';
    if (profileImageUrl !== '' && profileImageUrl != null) {
      return '';
    } else {
      return 'We need your profile to continue.';
    }
  }

  static nationalIdURLValidate(formData) {
    var email = formData != null ? formData : '';
    if (email !== '' && email != null) {
      return '';
    } else {
      return 'We need your NID to continue.';
    }
  }
  static vehicleDocumentValidate(formData) {
    var vehicleDocumentURL = formData != null ? formData : '';
    if (vehicleDocumentURL !== '' && vehicleDocumentURL != null) {
      return '';
    } else {
      return 'We need your registration document to continue.';
    }
  }

  static contractImageValidate(formData) {
    var contractImageURL = formData != null ? formData : '';
    if (contractImageURL !== '' && contractImageURL != null) {
      return '';
    } else {
      return 'We need your contact document to continue.';
    }
  }

  static passwordValidate(formData) {
    let password = formData;

    if (password !== null && password !== '' && password !== undefined) {
      if (/^\s*$/.test(password)) {
        return 'Please do not use any space in your password.';
      } else if (password.length < 6) {
        return 'Please choose a password with a minimum of 6 characters.';
      }
    } else {
      return 'We need your password to continue.';
    }
    return '';
  }

  static matchPasswordValidate(formData) {
    let password = formData.password;
    let rePassword = formData.rePassword;
    // console.log(password, 'muin', rePassword);

    if (rePassword === '' || rePassword === null || password === undefined) {
      return 'Please re-enter your password to authorize.';
    } else if (password !== rePassword) {
      return 'Your password does not match our records.';
    }
    return '';
  }

  static streetValidate = formData => {
    let streetName = formData != null ? formData.trim() : '';

    if (streetName === null || streetName === '' || streetName === undefined) {
      return 'We need your street name to continue.';
    }
    return '';
  };

  static mobilevalidate = formData => {
    let mobile = formData != null ? formData.trim() : '';

    if (mobile === null || mobile === '' || mobile === undefined) {
      return 'We need your street name to continue.';
    }
    return '';
  };

  static nickName = formData => {
    let nickName = formData != null ? formData.trim() : '';

    if (nickName === null || nickName === '' || nickName === undefined) {
      return 'We need your name  to continue.';
    }
    return '';
  };
  static address = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your address  to continue.';
    }
    return '';
  };

  static nid = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your NID  to continue.';
    }
    return '';
  };

  static passport = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your passport ID  to continue.';
    }
    return '';
  };

  static trade = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your tradeLicense ID to continue.';
    }
    return '';
  };

  static shopTypeID = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your  Shop Type ID to continue.';
    }
    return '';
  };

  static productName = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your  productName to continue.';
    }
    return '';
  };

  static price = formData => {
    let address = formData != null ? formData.trim() : '';

    if (
      address === null ||
      address === '' ||
      address === undefined ||
      isNaN(address)
    ) {
      return 'We need your Product Price to continue.';
    }
    return '';
  };

  static unit = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your Product Unit to continue.';
    }
    return '';
  };

  static quantity = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your Product Quantity to continue.';
    }
    return '';
  };

  static des = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your Product description to continue.';
    }
    return '';
  };

  static category = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your Product category to continue.';
    }
    return '';
  };

  static title = formData => {
    let address = formData != null ? formData.trim() : '';

    if (address === null || address === '' || address === undefined) {
      return 'We need your Product Title to continue.';
    }
    return '';
  };

  static cityValidate = formData => {
    let cityName = formData != null ? formData.trim() : '';

    if (cityName === null || cityName === '' || cityName === undefined) {
      return 'We need your city name to continue.';
    }
    return '';
  };

  static pinCodeValidate = formData => {
    // console.log('muin');
    let pincode = formData != null ? formData.trim() : '';

    if (pincode === null || pincode === '' || pincode === undefined) {
      return 'We need your postcode to continue.';
    }
    return '';
  };

  static stateValidate = formData => {
    let stateName = formData != null ? formData.trim() : '';

    if (stateName === null || stateName === '' || stateName === undefined) {
      return 'We need your state name to continue.';
    }
    return '';
  };

  static countryValidate = formData => {
    let countryName = formData != null ? formData.trim() : '';

    if (
      countryName === null ||
      countryName === '' ||
      countryName === undefined
    ) {
      return 'We need your country name to continue.';
    }
    return '';
  };
}
export default FormValidation;
