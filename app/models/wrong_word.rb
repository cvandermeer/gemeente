class WrongWord < ActiveRecord::Base
  ### VALIDATIONS ###
  validates :word, presence: true,
                   uniqueness: true

  ### CALLBACKS ###
  before_validation :to_lower

  def to_lower
    self.word = self.word.downcase
  end

end
