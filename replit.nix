
{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.nodePackages.typescript-language-server
    pkgs.psmisc
    pkgs.libxcrypt
  ];
}
