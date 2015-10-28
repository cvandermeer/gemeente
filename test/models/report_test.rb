require 'test_helper'

class ReportTest < ActiveSupport::TestCase
  setup :initialize_report

  def teardown
    @report = nil
  end

  ### VALIDATIONS ###
  test 'should not create report without any input' do
    report = Report.new
    assert_not report.save, 'Saved an report without any input!'
  end

  test 'should not create report without title' do
    report = @report
    report.title = nil
    assert_not report.save, 'Saved an report without title!'
  end

  test 'should not create report without description' do
    report = @report
    report.description = nil
    assert_not report.save, 'Saved an report without description!'
  end

  test 'should not create report without address' do
    report = @report
    report.address = nil
    assert_not report.save, 'Saved an report without address!'
  end

  test 'should not create report without town' do
    report = Report.new(title: @report.title,
                        description: @report.description,
                        address: @report.address)
    assert_not report.save, 'Saved an report without town!'
  end

  ### METHODS ###
  test 'should parse street out of address' do
    report = @report
    assert_equal report.set_street, 'Schoolpad'
  end

  test 'should retun location of report' do
    report = @report
    assert_equal report.location, 'Schoolpad 7, Middenmeer'
  end

  private

  def initialize_report
    report = reports(:report1)
    @report = Report.new(title: report.title,
                         description: report.description,
                         address: report.address,
                         town: report.town)
  end
end
