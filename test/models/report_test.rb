require 'test_helper'

class ReportTest < ActiveSupport::TestCase
  setup :initialize_report

  def teardown
    @new_report = nil
    @report = nil
    @report2 = nil
  end

  ### VALIDATIONS ###
  test 'should not create report without any input' do
    report = Report.new
    assert_not report.save, 'Saved an report without any input!'
  end

  test 'should not create report without title' do
    @new_report.title = nil
    assert_not @new_report.save, 'Saved an report without title!'
  end

  test 'should not create report without description' do
    @new_report.description = nil
    assert_not @new_report.save, 'Saved an report without description!'
  end

  test 'should not create report without address' do
    @new_report.address = nil
    assert_not @new_report.save, 'Saved an report without address!'
  end

  test 'should not create report without town' do
    @new_report.town = nil
    assert_not @new_report.save, 'Saved an report without town!'
  end

  test 'should create @report' do
    assert @report.save
  end

  ### METHODS ###
  test 'should parse street out of address' do
    report = @report
    assert_equal report.set_street, 'Schoolpad'
  end

  test 'should return location' do
    report = @report
    assert_equal report.location, 'Schoolpad 7, Middenmeer'
  end

  test 'should set and create community' do
    assert_difference('Community.count') do
      @report.set_community
    end
    assert_equal @report.community.name, 'Hollands Kroon'
  end

  test 'should set community if it already exists' do
    assert_no_difference('Community.count') do
      @report2.set_community
    end
  end

  test 'should return image path' do
    assert_equal @report.image_one.store_dir, "uploads/report/image_one/#{@report.id}"
  end

  test 'should whitelist jpg jpeg gif and png' do
    assert_equal @report.image_one.extension_white_list, ['jpg', 'jpeg', 'gif', 'png']
  end

  private

  def initialize_report
    @report = reports(:report1)
    @report2 = reports(:report2)
    @community = communities(:community1)
    @new_report = Report.new(title: @report.title,
                             description: @report.description,
                             address: @report.address,
                             town: @report.town)
  end
end
