# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

# Sets up the date format
my_date_formats = { default: '%d/%m/%Y' }
Time::DATE_FORMATS.merge!(my_date_formats)
Date::DATE_FORMATS.merge!(my_date_formats)
