require 'test_helper'

class ZipcodeTest < ActiveSupport::TestCase
  test 'should get street search results' do
    assert Zipcode.search_streets('Schoolpad').any?, 'No street search results'
  end

  test 'should get town search results' do
    assert Zipcode.search_towns('Middenmeer').any?, 'No town search results'
  end
end
