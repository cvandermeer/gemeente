class ReportCategory < ActiveRecord::Base
  ### ASSOCIATIONS ###
  belongs_to :report
  belongs_to :category

  ### VALIDATIONS ###
  validates :category, presence: true
end
