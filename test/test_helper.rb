require 'simplecov'
SimpleCov.start 'rails'
SimpleCov.command_name 'Unit Tests'
require "minitest/reporters"
Minitest::Reporters.use!
include Devise::TestHelpers

ENV["RAILS_ENV"] = "test"
require File.expand_path("../../config/environment", __FILE__)
require "rails/test_help"
require "minitest/rails"
require 'capybara/rails'

class ActiveSupport::TestCase
  fixtures :all
end
