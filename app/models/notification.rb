class Notification < ActiveRecord::Base
  ### ASSOCIATIONS ###
  belongs_to :user

  ### CONSTANTS ###
  CATEGORY_REPORT = 0
  CATEGORY_NEWS = 1

  enum category_id: {
    report: CATEGORY_REPORT,
    news: CATEGORY_NEWS
  }
end
