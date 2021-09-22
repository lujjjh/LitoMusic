pub struct ParsedArgs {
    dev_tools: bool,
}

impl ParsedArgs {
    pub fn from_args() -> Self {
        let mut dev_tools = false;
        for arg in std::env::args() {
            if arg == "--dev-tools" {
                dev_tools = true;
            }
        }
        Self { dev_tools }
    }

    pub fn dev_tools(&self) -> bool {
        self.dev_tools
    }
}
