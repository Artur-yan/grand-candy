import {locales} from '../locales';
import messages from "./index";
import LanguageStorage from "../../platform/services/storages/languageStorage";
import React from "react";
// messages[LanguageStorage.getLanguage()]['chat_write_message'] chat_write_message
export default {
  [locales.EN]: {
    'price': 'AMD',
    'free': 'Free',
    //FAQ 6 9 10 11
    'FAQ.questions': 'Frequently asked questions',
    'FAQ.questions-1-title': 'Frequently asked questions',
    'FAQ.questions-1-text': '“Grand Candy” LLC enables its customers to buy or order the products online through the mobile application and the website. The main purpose of the online purchasing platform is to provide complete and detailed information about the company products at any time and at any place that is convenient for the customers. The system allows to simplify the purchasing process and save customers’ precious time.',
    //2
    'FAQ.questions-2-title': 'Which are the pros of the online purchasing?',
    'FAQ.questions-2-text': 'By using the online purchasing system customers have a chance to organize the shopping process at any time and at any place convenient for them, to collect bonuses from each order, which can be used during next orders by paying from the “Bonus Card”, to participate in the surprise-promotions and get gifts as well. Customers have a chance to save their time by using the “Pick up” or “Delivery” services.',
    //3
    'FAQ.questions-3-title': 'What does the “Bonus Card” mean?',
    'FAQ.questions-3-text': 'Customers have a chance to collect the 10% of the order’s total amount in the pre-activated “Bonus Card” with each online order. The “Bonus Card” can be activated in the “Personal page” section, by mentioning customer’s date of birth and the phone number. The collected bonuses can be used during each new order and with any amount. There is no time limit for using the collected bonuses.',
    //4
    'FAQ.questions-4-title': 'What does the “Find code, Get price” mean?\n',
    'FAQ.questions-4-text': '“Grand Candy” LLC has prepared surprises for its customers about which customers will be notified in advance. The promotion will not be available permanently, but within the framework of specific campaigns.',

    //5
    'FAQ.questions-5-title': 'What does the “Pick up” service mean?',
    'FAQ.questions-5-text': 'With the help of “Pick up” service, customers can form the required products’ basket at any time and at any place convenient for them, choose the desirable or the nearest brand store and pick up the basket at the time initially specified by them. To use the “Pick up” service there is a necessity to attach a payment card through which the advance payment will be done. This way customers will have a chance to avoid ques and take the basket from the brand store in the shortest time possible. Customers will bring the baskets from the brand stores by scanning system. Customers can place a “Pick up” order according to the following schedule:\n',
    'address1': '7 Aleq Manukyan St.',
    'address2': '87/5 Artashisyan St.',
    'address3': '5-32 Avan Arinj, 1st Micro-District',
    'address4': '25 Azatutyan Ave.',
    'address5': '87/7 Babajanyan St.',
    'address6': '17 Bagratunyats Ave.',
    'address7': '188 Bashinjaghyan St.',
    'address8': '18 Erebuni St.',
    'address9': '4/5 Hasratyan St.',
    'address10': '3 Kasyan St.',
    'address11': '214/7 Khudyakov St.',
    'address12': '5a Mashtots Ave.',
    'address13': '54 Mashtots Ave., “Ponchikanots”',
    'address14': '21 Papazyan St.',
    'address15': '55/5 Paruyr Sevak St.',
    'address16': '2/2 Safaryan St.',
    'address17': '12 Tigran Mets Ave.',
    'address18': '71 Tigran Mets Ave.',
    'address19': '31/1 Tigran Petrosyan St.',
    'address20': '61a Vantyan St.',
    'address21': '50 Masis St.',

    'schedule': 'Schedule',
    'brand_store': 'Brand Store',

    'every_day': 'Every day',
    'monday_to_friday': 'Monday to Friday ',
    'saturday': 'Saturday',
    'closed_days': 'Closed on Sundays and Holidays.',

    //6 ??????
    'FAQ.questions-6-title': 'How is it possible to find the desired products?',
    'FAQ.questions-6-list': 'Customers can find the desired products by the following ways',
    'FAQ.questions-6-list1': 'through search system - by mentioning the desired product name;',
    'FAQ.questions-6-list2': 'in the product categories;',
    'FAQ.questions-6-list3': 'in the most popular products list;',
    'FAQ.questions-6-list4': 'in the favorite products list.',

    //7
    'FAQ.questions-7-title': 'Is it possible to create a favorite products list without forming the purchasing basket?',
    'FAQ.questions-7-text': 'Yes, the system allows customers not only to separate the favorite products in the “Favorite” section, but also to pick out the preferable brand stores.',

    //8
    'FAQ.questions-8-title': 'Is it possible to choose the exact date and time of delivery?',
    'FAQ.questions-8-text': 'Yes, both mobile application and the website allow to indicate all the required information regarding the delivery, as well as the exact date, time or any other comments regarding it, after forming the purchasing basket.',

    //9 ???????????
    'FAQ.questions-9-title': 'Which delivery directions are available?',
    'FAQ.questions-9-text': 'The delivery is available in the whole territory of Yerevan city. More detailed information about the delivery is possible to find in “Delivery terms” section.',

    //10 ??????????
    'FAQ.questions-10-title': 'Which payment methods are available?',
    'FAQ.questions-10-text': 'In the “Grand Candy” mobile application and website there are two possible payment methods: online and cash. More detailed information about the payment process is possible to find in “Payment terms” section.',

    //11
    'FAQ.questions-11-title': 'Is it possible to cancel the order?',
    'FAQ.questions-11-point1': 'Customer can cancel the order with the help of “Cancel order” button within a maximum of 10 minutes after placing the order. The mentioned is actual for both “Pick up” and “Delivery” services.\n',
    'FAQ.questions-11-point2': 'In case of “Pick up” service, order will be automatically cancelled if the customer is late than the time initially specified by him/her and as a result of which the brand store is already closed.\n',

    //12
    'FAQ.questions-12-title': 'Is it possible to return the ordered products?',
    'FAQ.questions-12-text': 'Customer who has bought a product with poor quality has right to return the product if the defects were found before the expiration date and when a receipt is presented, as a proof of purchase. In the absence of a dispute over the causes of product defects the sold product with poor quality will be replaced by a product of good quality or the amount paid by the customer will be refunded.\n',

    //13
    'FAQ.questions-13-title': 'How is it possible to receive the money back in case of order cancelling or returning?',
    'FAQ.questions-13-text': 'The total amount of the cancelled or returned order will be refunded to the customer online by crediting back the amount to the payment card or providing the money in cash. Furthermore, there is no partial refund.\n',

    //14
    'FAQ.questions-14-title': 'What does the “My addresses” mean?',
    'FAQ.questions-14-text': 'In the “Grand Candy” mobile application and website it is possible to separate customers’ favorite address or addresses in the “My addresses” section, name them and indicate all the necessary information in order to simplify the address-mentioning process during the delivery order placing.\n',

    //15
    'FAQ.questions-15-title': "Why isn't it possible to place a delivery order?",
    'FAQ.questions-15-text': 'The “Delivery” service through the “Grand Candy” mobile application and website is currently under development and will be available to the customers soon.',

    //Delivery Terms
    'delivery_terms': 'Delivery terms',
    'delivery_terms_text1': 'Products can be ordered through “Grand Candy” mobile application and website. Customers choose the product, add in purchasing basket, mention phone number, required delivery address, date and period of time in which the order must be delivered, comments in case of necessity in order to provide more detailed information regarding the delivery, choose the payment method, as well as mentions whether to use the collected bonuses or not.\n',
    'delivery_terms_text2': 'Customers can contact the customer service specialist online, if, after placing the order, there is a need to buy more products or to replace one of the ordered products by another. ',
    'delivery_terms_text3': 'Customers can track new order status in the “Personal page” section (e.g. “Collecting”, “Ready to be delivered”, “On the road” or “Delivered”) and see all information regarding the previous orders.',
    'delivery_terms_text4': 'It should be pointed out that that there are no limitations referring to the price of the products. In a word, regardless the fact that customers have an order with conditional value of 100 or 5 500 AMD, the payment will be proceeded exceptionally according to price of the product and the delivery cost.\n',
    'delivery_terms_text5': 'Delivery is available in the whole territory of Yerevan city. The approximate delivery time is 40 minutes. Delivery orders can be placed every day in the period of 10:40-18:50.\n',

    'delivery_terms_table_desc': 'Delivery fee for orders in Yerevan are as follows:',
    'delivery_terms_table_row1': 'For orders till 5 000 AMD',
    'delivery_terms_table_row2': 'For orders 5 000 – 10 000 AMD',
    'delivery_terms_table_row3': 'For orders 10 000 AMD and more',

    'attention': 'Attention!',
    'attention_point_one': 'Delivery delay can be caused by unforeseen circumstances only such as traffic jam, accident and another similar artificial reason. In such cases customer is notified about the delivery time change as soon as possible.\n',
    'attention_point_two': 'For proper and timely delivery, please fill in all the fields attentively and in case of any questions, please, contact our customer support specialists online in order to find the solution as soon as possible.\n',

    //Payment terms
    'payment_terms': 'Payment terms',
    'payment_text1': 'Payment through the mobile application and website is possible to do in two ways: online and cash. Online payments can be done by “ARCA”, “Visa” and “Master Card” payment cards and cash payments are made upon receipt of the order. The acceptable currency is Armenian Dram (AMD).',
    'payment_text2': 'All the prices introduced in the website are final and include all the taxes. The receipt certifying the fact of purchase is provided to the customer regardless the payment method. There is no partial refund.',
    //Return terms
    'return_terms': 'Return terms',
    'return_text': 'Customer who has bought a product with poor quality has right to return the product if the defects were found before the expiration date and when a receipt is presented, as a proof of purchase. In the absence of a dispute over the causes of product defects the sold product with poor quality will be replaced by a product of good quality or the amount paid by the customer will be refunded.',

    'faq_search_hint': 'How can we help you?',
    'faq_title': 'Frequently Asked Questions',
    "continue_text": 'Continue',
    "continue_shopping": 'Continue shopping',
    "sign_up": 'Sign up',
    "sign_in": 'Sign in',
    "email_or_phone_number": 'Email or phone number',
    "email": 'Email',
    "password": 'Password',
    "next": 'Next',
    "checkout": 'Checkout',
    "first_name": 'First name',
    "first_full": 'Full name',
    "comment": 'Comment',
    "last_name": 'Last name',
    "save": 'Save',
    "cancel": 'Cancel',
    "delete": 'Delete',
    "sign_out": 'Sign out',
    "general": 'General',
    "settings": 'Settings',
    "news": 'News',
    "favorites": 'Favorites',
    "search": 'Search',
    "retry": 'Retry',
    "remove": 'Remove',
    "undo": 'Undo',
    "armenia": 'Armenia',
    "kg": 'kg',
    "kb": 'KB',
    "item": 'pcs',
    "box": 'box',
    "ok": 'OK',
    "activate": 'Activate',
    "send": 'Send',
    "attachment": 'Attachment',

    //errors
    "error_email": "Invalid email",
    "characters": "characters",
    "letters": "letters",
    "digits": 'digits',

    "error_email_or_phone_number": "Invalid email or phone number",

    "error_login": "Invalid email or password",

    "error_email_minimum_count": "Email must contain at least",

    "error_email_maximum_count": "Email must be less than",

    "error_first_name_minimum_count": "First name must contain at least",

    "error_recipient_name_minimum_count": "Recipient name must contain at least",

    "error_recipient_name_maximum_count": "Recipient name must be less than",

    "error_last_name_minimum_count": "Last name must contain at least",

    "error_first_name_maximum_count": "First name must be less than",

    "error_last_name_maximum_count": "Last Name must be less than",

    "error_special_characters": "Special characters and numbers are not allowed",

    "error_passwords_not_match": "Passwords do not match",

    "error_password_minimum_count": "Password must contain at least",

    "error_password_maximum_count": "Password must be less than",

    "error_verification_code": "Verification code must be",

    "error_title_text_min_count": "Title must contain at least",

    "error_title_text_max_count": "Title must be less than",

    "error_title": "Invalid title",

    "error_address_text": "Choose address",

    "error_phone_number": "Invalid phone number",

    "error_phone_number_minimum_count": "Phone number must be at least 8 numbers",

    "error_phone_number_maximum_count": "Phone number must be less than 8 numbers",

    "error_code_validation": "Code shouldn't be empty",

    "error_code_invalid": "Incorrect verification code",

    "error_birth_date": "Choose birth date",

    "error_feedback_minimum_count": "Subject must be at least 5 letters",

    "error_feedback_max_count": "Subject must be less than 100 letters",

    "error_rating": "Choose rate",

    "error_order_type": "These services are not available at this time.",

    //Sign in page
    "auth_sign_in_hint_text": 'Please enter your email and password to sign in into your account',
    "auth_forgot_password": 'Forgot password?',
    "auth_do_not_have_an_account": 'Don\'t have an account?',

    //Sign up page
    "sign_up_have_an_account": 'Already have an account?',
    "sign_up_description": 'Please give us your personal information to create account',

    //Forgot page
    "forgot_title": 'Forgot password',
    "forgot_description": 'Please write your account email address to recover password',

    // Verification page
    "code": 'Code',
    "verification_description": 'We have sent you verification code to your email',
    "verification_resend_code": 'Resend again',
    "verification_resend_code_in": 'Resend code in',
    "send_code": 'Send code',
    "verification_resend": 'Resend',

    //Create password page
    "create_password_description_sign_up": 'Please create password for your account',
    "create_password_description_forgot": 'Please create new password for your account',
    "create_password_new_password": 'New password',
    "create_password_current_password": 'Current password',
    "create_password_confirm_new_password": 'Confirm new password',
    "create_password_agreement_text": 'I have read and agree with',
    "and": 'and ',
    "create_password_please_give_agreement": 'To continue, you must agree to Terms and Conditions and Privacy Policy',
    "notifications": 'Notifications',
    "more_about_app": 'About app',
    "more_faq": 'FAQ',
    "more_customer_service": 'Customer service',
    "more_our_shops": 'Our shops',
    "more_about_grand_candy": 'About Grand Candy',
    "more_account": 'Account',
    "more_personal_information": 'Personal information',
    "more_bonus_card": 'Bonus card',
    "more_my_orders": 'My orders',
    "more_my_addresses": 'My addresses',
    "more_payment_methods": 'Payment methods',
    "dialog_sign_out_description": 'Are you sure you want to sign out from your account?',

    "about_app_rate_us": 'Rate us',
    "about_app_social_hint": 'Find us in social',
    "version": 'Version',

    //header
    "terms_and_conditions": 'Terms and Conditions',
    "privacy_policy": 'Privacy Policy',
    "delivery_and_returns": 'Delivery and Returns',
    //

    //Hom page
    'home': 'Home',
    'products': 'Products',
    'about': 'About',
    'shop': 'Shop',
    'how_its_made': "How it's made",
    'careers': 'Careers',
    'join_out_team': 'Join our team and you\'ll love your job',
    'home_page_top_categories': 'Top categories',
    'home_page_most_popular': 'Most popular',
    'search_all_categories': 'All categories',
    'search_categories': 'Categories',

    //Empty views
    'empty_notifications_title': 'No notifications',
    'empty_notifications_description': "You don't have any notifications yet",
    'empty_favorite_title': 'No favorites',
    'empty_favorite_description': "You haven't added any product to favorites list",
    'empty_addresses_title': 'No addresses',
    'empty_addresses_description': "You haven't any saved addresses yet",
    'empty_faq_title': 'No search result',
    'empty_faq_description': "You haven't any result.",
    'empty_basket_title': 'Basket is empty',
    'empty_basket_description': 'To see products here you should first add them to basket',
    'empty_order_title': 'No orders',
    'empty_order_description': 'There is no order found',
    'empty_bonus_title': 'No transactions',
    'empty_bonus_description': 'There is no transaction found with your bonus card',
    'empty_payment_title': 'No payment method',
    'empty_payment_description': 'There is no payment method found',

    //  PaymentTypeEnum
    'payment_type_enum_cash': 'Cash',
    'payment_type_enum_card': 'Credit card',

    //  orderType
    'order_type_enum_pending': 'Pending',
    'order_type_enum_finished': 'Finished',
    'order_type_enum_canceled': 'Canceled',
    'order_type_enum_accepted': 'Pending',
    'order_type_enum_branch_attached': 'Pending',
    'order_type_enum_started': 'Delivering',
    'order_type_enum_driver_attached': 'Accepted',

    //  personal info
    'personal_info_title': 'Personal information',
    'personal_info_dialog_title': 'Delete photo',
    'personal_info_dialog_sub_title': 'Are you sure you want to delete photo?',
    'personal_info_change_password': 'Change password',
    'personal_info_date_of_birth': 'Date of birth',
    'personal_info_change_success': 'Profile information was changed successfully',
    'personal_info_password_change_success': 'Password was changed successfully',
    'profile': 'Profile',
    //  new address
    'add_new_address': 'Add new address',
    'add_new_address_title': 'Title',
    'add_new_address_name': 'Name',
    'add_new_address_address': 'Address',
    'add_new_address_apartment': 'Apartment',
    'add_new_address_building': 'Building',
    'add_new_address_floor': 'Floor',
    'add_new_address_entrance': 'Entrance',
    'add_new_address_button_title': 'Save address',
    'add_new_address_make_this_address_default': 'Make this address default',
    'add_new_address_location': 'Location',
    'add_new_address_save_in': 'Save in My addresses',

    'delete_address': 'Delete Address',
    'delete_address_description': 'Do you want to delete address?',

    //   Product details page
    'product_details_shelf_life': 'Shelf life',
    'product_details_ingredients': 'Ingredients',

    "product_details_add_to_basket": "Add to basket",
    "product_details_add_to_favorites": "Add to favorites",
    "product_details_added_to_basket": "Added to basket",
    //   Basket page
    'basket_go_to_checkout': 'Go to checkout',
    'basket_title': 'Basket',
    'basket_bonuses': 'Gained bonus',
    'basket_total': 'Total',
    'delivery_title': 'Order type',
    'basket_pick_up': 'Pick up',
    'basket_pick_ap_description': 'Order will be ready to pick up in your chosen Grand Candy branch',
    'delivery': 'Delivery',
    'basket_delivery_description': 'Order will be delivered to your location. Closest delivery time',
    'basket_delivery_method_error': 'Choose Order type',
    'change': 'Change',
    'add': 'Add',
    'basket_pick_up_time': 'Pick up time',
    'basket_delivery_time': 'Delivery time',
    'basket_payment_method': 'Payment method',
    'basket_choose_your_payment_method_to_finish_order': 'Choose your payment method to finish order',
    'basket_use_bonuses': 'Use bonuses',
    'basket_delivery_address': 'Delivery address',
    'basket_pick_up_shop': 'Pick up shop',
    'basket_pick_bonus': 'bonus',
    'basket_bonus_amount': 'Bonus amount',
    'select': 'Select',
    'basket_no_delivery_address': ':"No delivery address',
    'basket_delivery_fee': 'Delivery fee',
    'basket_subtotal': 'Subtotal',
    'basket_used_bonuses': 'Used bonuses',

    //   Order page
    "order_history": 'History',
    "order_ongoing_order": 'Ongoing order',
    "order_pick_up_date": 'Pick up date',
    "order_delivery_date": 'Delivery date',
    "order_pick_up_shop": 'Pick up shop',
    "order_delivery_address": 'Delivery address',
    "order_at": 'at',
    "order": 'My Orders',
    "order_details_products": 'Products',
    "order_details_bonuses": 'Bonuses',
    "order_details_order_information": 'Order information',
    "order_dialog_title": 'Order placed',
    "order_dialog_sub_title": 'has been successfully placed and on it\'s way to being accepted',
    "order_summary": 'Order summary',
    "earned_bonus": 'Gained bonus',

    'transactions_title': 'Transactions',

    //  Payment methods page
    "payment_methods_title": 'Payment methods',
    "payment_dialog_title": 'Delete card',
    "payment_dialog_sub_title": 'Are you sure you want to delete card?',
    "phone_number": 'Phone number',
    "verify": 'Verify',
    "bonus_card_activation": 'Bonus card activation',
    "bonus_card_description": 'You need to verify your phone number and select your date of birth',
    "bonus_bottom_sheet_description": 'Activate your bonus card and use plenty of advantages',
    "bonus_bottom_sheet_title": 'Activate bonus card!',
    "rate_title": 'Rate our service',
    "rate_sub_title": 'Please rate our shop worker service quality and write feedback for any issues or suggestions',
    "rate_leave_a_feedback": 'Leave a feedback',
    "rate_order": 'Rate order',
    "chat_write_message": 'Write message',
    "order_branch_not_available": 'Branch is not available for pick up',
    "order_comment_description": 'Comment for order',
    "order_recipient_information": 'Recipient information',
    "order_details_comment": 'Comment:',
    "order_details_recipient": 'Recipient:',
    "bonus": 'BONUS',
    "card": 'CARD',
    "update_available_message": 'An update has been downloaded',
    "update_available_title": 'Update',
    "view_all": 'View all',
    "working_hours": 'Working hours',

    //footer
    "the_sweetest": "The sweetest candy shop in Armenia",
    //  About
    "about_company_title": 'About Grand Candy',
    "about_company_description": '"Grand Candy" is the largest enterprise in the food industry in Armenia. The company was founded in the beginning of 2000 by Hrant Vardanyan.First, hard candy production was launched, then that of chocolates. These two facilities were manufacturing 100 names of confectionery products. In 2000, only 600 people were working in “Grand Candy”. Increasing the annual volume of production and sales, "Grand Candy" nowadays accounts for more than 40 percent of the confectionery market in Armenia. Due to well-organized production, the company managed to gain considerable presence in the market, offering well-known, traditional, as well as newly developed products to customers.Currently, "Grand Candy" produces more than 400 different products. "Grand Candy" is the only factory in the Transcaucasia to process cocoa beans.',
    "about_company_description1": 'Delivery of the company’s products is carried out by 270 trucks through its own wholesale and retail network, 8 regional warehouses, 29 brand stores, thus supplying 8450 network, wholesale and retail food outlets in Armenia. Today the company organizes direct supply to 99.9% of shops all over Armenia."Grand Candy" production is certified with ISO 9001:2008 quality management standards and ISO 22000:2005 food safety control standards. The advantage of "Grand Candy" products is the high quality and the use of only natural ingredients, such as cocoa and dairy products, nuts and fillings made from fresh fruits. Despite the high cost of natural raw materials, "Grand Candy" never uses cheap and low quality ingredients or artificial additives of any kind. The key priority of "Grand Candy" is the health of its consumers.',
    "about_company_description2": 'Therefore, all the ingredients used in the production undergo an extensive analysis in the company’s main laboratory, which is certified according to ISO 17025 standards, and the quality control department ensures high and stable quality of the products.In 2001 "Grand Candy" began the production of ice-cream. The plant is equipped with Italian production lines.In 2006 "Grand Candy" launched its own production of corrugated cardboard packaging.In 2007 the company opened an offset printing-house, equipped with German machinery.In 2008 "Grand Candy" launched the production of coffee using modern technologies and Italian equipment. Arabica and Robusta coffee beans of highest quality are used in the production.In 2010 "Grand Candy" started producing exquisite pastries, which promptly became quite popular with our customers.',
    "about_company_description3": 'For the first time it became possible in Armenia to bake "home-made" pastries in industrial conditions.In 2012 "Grand Candy" started the production of flour. Presently, due to the modern European technologies and equipment, the company produces flour with the best qualitative properties.In 2016 the company opened a flexographic printing house, which is equipped with modern German printing machinery.The regular upgrading of the equipment and the introduction of new technologies enable the company to quickly react to market changes and maintain the leading position on the domestic market.On September 10, 2010, "Grand Candy" set a new Guinness World Record with the "Largest chocolate bar". It became the first industrial record in Armenia.In 2000 "Grand Candy" set up a chain of brand stores, the first one in the long chain being "Ponchikanots".',
    "about_company_description4": 'Today the company operates 29 brand stores throughout the Republic of Armenia, 21 of which, including 10 store-cafes, are located in Yerevan."Grand Candy" is distinguished by its unique human resources management policy, which enabled us to create a team of dedicated professionals. Today "Grand Candy" is the largest domestic production company in the Republic of Armenia with more than 3200 employees. Every day the staff of "Grand Candy" and the company’s owner himself go to work with one motto "Our quality is our pride”. ',

    //Contact us
    'contact_us': 'Contact us',
    'head_office': 'Head office',
    'grand_candy_llc': 'Grand Candy LLC',
    'sales_department': 'Sales department',
    'quality_department': 'Quality control department',
    'export_department': 'Export department',
    'human_department': 'Human resources department',
    'international_department': 'Supply and international relations department',
    'full_address': '0061, Yerevan, 31 Masisi str, Republic of Armenia',

    'recommended_for_you': 'Recommended for you',

    'save_changes': 'Save changes',
    'bonus_card_transactions': 'Bonus card transactions',
    'salary_card': 'Salary card',
    'total_price': 'Total price',
    'password_is_required': 'Passwords is required!',
    'new_password_is_required': 'New password is required',
    'filter_by': 'Filter by',
    'sort_by': 'Sort by',
    'all': 'All',
    'my_cards': 'My cards',
    'back_to_orders': 'Back to all orders',
    'back_to_delivery': 'Back to delivery option',

    'price_height_to_low' : 'Price height to low',
    'price_low_to_height' : 'Price low to height',
    'alphabetical_a_z' : 'Alphabetical A-Z',
    'alphabetical_z_a' : 'Alphabetical Z-A',

    'add_card': 'Add card',
    'add_new_card' : 'Ann new card',
    'card_holder' : 'Card holder',
    'card_number' : 'Card number',
    'exp_date' : 'Exp. date',
    'make_this_payment_method_default' : 'Make this payment method default',

    'delete_card': 'Delete card',
    'delete_card_description': 'Do you want to delete card?',

    'payment_added_successfully': 'Payment method added successfully',
    'payment_added_error': 'Something went wrong!',

    'delivery_option': 'Delivery option',
    'payment_option': 'Payment options',

    'choose_pick_up_location': 'Choose pick up location',
    'comment_to_driver': 'Comment to driver',

    'choose_pickup_date': 'Choose pick up date and time',

    'select_date': 'Select date',
    'select_time': 'Select time',
    'select_card': 'Select card',

    'error_comment_contain': 'Comment for driver should contain less than 100 symbols',

    'error_name_required': 'Name is required!',

    'error_pickup_time_required': 'Pick up time is required!',

    'error_phone_number_required': 'Phone number is required!',

    'error_address_required': 'Address is required!',

    'error_fields_required': 'All fields is required!',

    'pay_order_desc': 'You will pay when you will get your order',

    'choose_pickup_time': 'Choose pick up date and time',
  },
};
