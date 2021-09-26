extern crate embed_resource;

fn main() {
    embed_resource::compile("lito-manifest.rc");
    embed_resource::compile("version.rc");
}
