require 'test_helper'

class CategoriesControllerTest < ActionController::TestCase
  setup :login_user

  test 'should get index' do
    get :index
    assert_response :success
  end

  test 'should create category' do
    assert_difference('Category.count') do
      post :create, category: { title: 'Afvalcontainer', icon_name: 'fa-trash-o' }
    end
    assert_redirected_to categories_path
    assert_equal 'De categorie Afvalcontainer is aangemaakt', flash[:notice]
  end

  private

  def login_user
    sign_in users(:user_admin)
  end
end
