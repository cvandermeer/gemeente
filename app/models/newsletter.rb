class Newsletter < ActiveRecord::Base
  mount_uploader :pdf, PdfUploader

  ### ASSOCIATIONS ###
  belongs_to :community
  belongs_to :user
  has_many :deliveries

  delegate :name, to: :community, prefix: true

  ### VALIDATIONS ###
  validates :title, presence: true
  validates :valid_from, presence: true
  validates :valid_until, presence: true
  validates :community, presence: true
  validates :user, presence: true

  validate :pdf_or_body

  private

  def pdf_or_body
    errors.add(:base, 'Voeg een bestand of text toe') if body.blank? && pdf.blank?
  end
end
