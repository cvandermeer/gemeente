class Notification < ActiveRecord::Base
  ### ASSOCIATIONS ###
  belongs_to :user

  ### CONSTANTS ###
  CATEGORY_REPORT = 0

  enum category_id: {
    report: CATEGORY_REPORT
  }
end
