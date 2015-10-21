class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :thumb do
    process resize_to_fit: [200, 200]
  end

  version :mini_thumb do
    process resize_to_fit: [150, 150]
  end

  version :image_cropped do
    process resize_to_fill: [400, 400]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
