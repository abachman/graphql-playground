module FileHelpers
  def fixture_file_read(path)
    @fixture_files ||= {}

    # path should be local to caller
    local = File.dirname(caller_locations.first.absolute_path)

    @fixture_files[path] ||= File.read(File.join(local, path))
    @fixture_files[path]
  end
end
