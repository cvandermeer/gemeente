class ReportCategory < ActiveRecord::Base
  belongs_to :report
  belongs_to :category
end
